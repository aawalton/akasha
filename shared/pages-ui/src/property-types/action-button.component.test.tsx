import { afterEach, beforeEach, describe, expect, it, mock, spyOn } from "bun:test"
import { BadgeLayoutProvider } from "@shared/design-badges/components/badge-layout-context"
import { act, cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { ActionVerbContext } from "../action-verbs/action-verb-registry"
import type { PageDataJSON, PropertyDefinition } from "@shared/pages-core/types"

type SetPropertyArgs = {
  readonly pageTypeSlug: string
  readonly pageId: string
  readonly propertyId: string
  readonly value: { readonly lastInvokedAt?: string }
}

const mockSetProperty = mock((_args: SetPropertyArgs) => {})

mock.module("../supabase/use-set-property-optimistic", () => ({
  useSetPropertyOptimistic: () => mockSetProperty,
}))

const { ActionButtonPropertyBadge } = await import("./action-button")
const { registerActionVerb, unregisterActionVerb } = await import(
  "../action-verbs/action-verb-registry"
)

const SCRATCH = "scratch-verb"

function actionDef(config: PropertyDefinition["config"], title = "Do It"): PropertyDefinition {
  return { id: "act", title, type: "action-button", config }
}

async function flushAsync() {
  await act(async () => {
    await Promise.resolve()
    await Promise.resolve()
    await new Promise((resolve) => setTimeout(resolve, 0))
  })
}

let handler = mock((_ctx: ActionVerbContext) => {})

beforeEach(() => {
  mockSetProperty.mockClear()
  handler = mock((_ctx: ActionVerbContext) => {})
  registerActionVerb(SCRATCH, handler)
})

afterEach(() => {
  cleanup()
  unregisterActionVerb(SCRATCH)
})

describe("ActionButtonPropertyBadge — render (A2)", () => {
  it("renders a <button> labeled with config.label in card context for an empty value", () => {
    render(
      <ActionButtonPropertyBadge
        property={actionDef({ verbId: SCRATCH, label: "Press Me" })}
        value={null}
        context="card"
        pageId="page_1"
        pageTypeSlug="things"
      />
    )
    const button = screen.getByRole("button")
    expect(button.textContent).toContain("Press Me")
  })

  it("renders a <button> in detail context for an empty value", () => {
    render(
      <ActionButtonPropertyBadge
        property={actionDef({ verbId: SCRATCH, label: "Press Me" })}
        value={null}
        context="detail"
        pageId="page_1"
        pageTypeSlug="things"
      />
    )
    expect(screen.getByRole("button").textContent).toContain("Press Me")
  })

  it("falls back to property.title when config.label is absent", () => {
    render(
      <ActionButtonPropertyBadge
        property={actionDef({ verbId: SCRATCH }, "My Action")}
        value={null}
        context="card"
        pageId="page_1"
        pageTypeSlug="things"
      />
    )
    expect(screen.getByRole("button").textContent).toContain("My Action")
  })
})

describe("ActionButtonPropertyBadge — height parity with sibling badges (#14343)", () => {
  it("renders through ButtonBadge chrome — no fixed-height strut, padding-driven badge height", () => {
    render(
      <ActionButtonPropertyBadge
        property={actionDef({ verbId: SCRATCH, label: "Train" })}
        value={null}
        context="card"
        pageId="page_1"
        pageTypeSlug="things"
      />
    )
    const button = screen.getByRole("button")
    expect(button.className).not.toContain("h-6")
    expect(button.className).toContain("py-0.5")
  })
})

describe("ActionButtonPropertyBadge — display channels (icon + badgeVariant) (#14271)", () => {
  it("renders the context icon as the button's first child and tints text by badgeVariant", () => {
    render(
      <BadgeLayoutProvider icon={<span data-testid="probe-icon" />}>
        <ActionButtonPropertyBadge
          property={actionDef({ verbId: SCRATCH, label: "Train", badgeVariant: "yellow" })}
          value={null}
          context="card"
          pageId="page_1"
          pageTypeSlug="things"
        />
      </BadgeLayoutProvider>
    )
    const button = screen.getByRole("button")
    const icon = screen.getByTestId("probe-icon")
    expect(button.contains(icon)).toBe(true)
    expect(button.firstElementChild).toBe(icon)
    expect(button.className).toContain("text-yellow")
    expect(button.textContent).toContain("Train")
  })

  it("renders exactly as before with no icon/badgeVariant — no leading element, no tint class", () => {
    render(
      <ActionButtonPropertyBadge
        property={actionDef({ verbId: SCRATCH, label: "Plain" })}
        value={null}
        context="card"
        pageId="page_1"
        pageTypeSlug="things"
      />
    )
    const button = screen.getByRole("button")
    expect(button.firstElementChild).toBeNull()
    expect(button.className).not.toContain("text-yellow")
    expect(button.textContent).toContain("Plain")
  })
})

describe("ActionButtonPropertyBadge — click / handler (A3)", () => {
  it("fires the registered handler exactly once with the full ctx and stops propagation", async () => {
    const parentClick = mock(() => {})
    const pageData: PageDataJSON = { hello: "world" }
    const { container } = render(
      <ActionButtonPropertyBadge
        property={actionDef({ verbId: SCRATCH, label: "Press Me" })}
        value={null}
        context="card"
        pageId="page_1"
        pageTypeSlug="things"
        pageData={pageData}
      />
    )
    container.addEventListener("click", parentClick)
    await act(async () => {
      fireEvent.click(screen.getByRole("button"))
    })
    expect(handler).toHaveBeenCalledTimes(1)
    const ctx = handler.mock.calls[0]?.[0]
    if (ctx === undefined) throw new Error("handler received no ctx")
    expect(ctx.pageId).toBe("page_1")
    expect(ctx.pageTypeSlug).toBe("things")
    expect(ctx.verbId).toBe(SCRATCH)
    expect(ctx.data).toEqual(pageData)
    expect(ctx.config.verbId).toBe(SCRATCH)
    expect(ctx.config.label).toBe("Press Me")
    expect(parentClick).not.toHaveBeenCalled()
  })

  it("passes {} as ctx.data when no pageData prop is supplied", async () => {
    render(
      <ActionButtonPropertyBadge
        property={actionDef({ verbId: SCRATCH })}
        value={null}
        context="card"
        pageId="page_1"
        pageTypeSlug="things"
      />
    )
    await act(async () => {
      fireEvent.click(screen.getByRole("button"))
    })
    expect(handler).toHaveBeenCalledTimes(1)
    const ctx = handler.mock.calls[0]?.[0]
    if (ctx === undefined) throw new Error("handler received no ctx")
    expect(ctx.data).toEqual({})
  })
})

describe("ActionButtonPropertyBadge — disabled states", () => {
  it("disables the button and console.errors when the verbId has no registered handler", () => {
    const errorSpy = spyOn(console, "error").mockImplementation(() => {})
    render(
      <ActionButtonPropertyBadge
        property={actionDef({ verbId: "no-such-verb" })}
        value={null}
        context="card"
        pageId="page_1"
        pageTypeSlug="things"
      />
    )
    expect(screen.getByRole("button").hasAttribute("disabled")).toBe(true)
    expect(errorSpy).toHaveBeenCalled()
    errorSpy.mockRestore()
  })

  it("disables the button when pageId is missing (no console.error)", () => {
    const errorSpy = spyOn(console, "error").mockImplementation(() => {})
    render(
      <ActionButtonPropertyBadge
        property={actionDef({ verbId: SCRATCH })}
        value={null}
        context="card"
        pageTypeSlug="things"
      />
    )
    expect(screen.getByRole("button").hasAttribute("disabled")).toBe(true)
    expect(errorSpy).not.toHaveBeenCalled()
    errorSpy.mockRestore()
  })

  it("disables the button when pageTypeSlug is missing", () => {
    render(
      <ActionButtonPropertyBadge
        property={actionDef({ verbId: SCRATCH })}
        value={null}
        context="card"
        pageId="page_1"
      />
    )
    expect(screen.getByRole("button").hasAttribute("disabled")).toBe(true)
  })
})

describe("ActionButtonPropertyBadge — confirm gate", () => {
  it("does not fire the handler when confirm=true and window.confirm returns false", async () => {
    const original = window.confirm
    window.confirm = mock(() => false)
    render(
      <ActionButtonPropertyBadge
        property={actionDef({ verbId: SCRATCH, confirm: true })}
        value={null}
        context="card"
        pageId="page_1"
        pageTypeSlug="things"
      />
    )
    await act(async () => {
      fireEvent.click(screen.getByRole("button"))
    })
    expect(handler).not.toHaveBeenCalled()
    window.confirm = original
  })

  it("fires the handler when confirm=true and window.confirm returns true", async () => {
    const original = window.confirm
    window.confirm = mock(() => true)
    render(
      <ActionButtonPropertyBadge
        property={actionDef({ verbId: SCRATCH, confirm: true })}
        value={null}
        context="card"
        pageId="page_1"
        pageTypeSlug="things"
      />
    )
    await act(async () => {
      fireEvent.click(screen.getByRole("button"))
    })
    expect(handler).toHaveBeenCalledTimes(1)
    window.confirm = original
  })
})

describe("ActionButtonPropertyBadge — recordInvokedAt (A4)", () => {
  it("writes lastInvokedAt via useSetPropertyOptimistic after the handler resolves", async () => {
    const asyncHandler = mock(() => Promise.resolve())
    registerActionVerb(SCRATCH, asyncHandler)
    render(
      <ActionButtonPropertyBadge
        property={actionDef({ verbId: SCRATCH, recordInvokedAt: true })}
        value={null}
        context="card"
        pageId="page_1"
        pageTypeSlug="things"
      />
    )
    await act(async () => {
      fireEvent.click(screen.getByRole("button"))
    })
    await flushAsync()
    expect(mockSetProperty).toHaveBeenCalledTimes(1)
    const args = mockSetProperty.mock.calls[0]?.[0]
    if (args === undefined) throw new Error("setProperty received no args")
    expect(args.pageTypeSlug).toBe("things")
    expect(args.pageId).toBe("page_1")
    expect(args.propertyId).toBe("act")
    const { lastInvokedAt } = args.value
    if (typeof lastInvokedAt !== "string") throw new Error("lastInvokedAt not written as a string")
    expect(Number.isNaN(Date.parse(lastInvokedAt))).toBe(false)
  })

  it("does not write when recordInvokedAt is absent", async () => {
    render(
      <ActionButtonPropertyBadge
        property={actionDef({ verbId: SCRATCH })}
        value={null}
        context="card"
        pageId="page_1"
        pageTypeSlug="things"
      />
    )
    await act(async () => {
      fireEvent.click(screen.getByRole("button"))
    })
    await flushAsync()
    expect(mockSetProperty).not.toHaveBeenCalled()
  })

  it("console.errors and does not write when the handler rejects", async () => {
    const errorSpy = spyOn(console, "error").mockImplementation(() => {})
    const rejecting = mock(() => Promise.reject(new Error("boom")))
    registerActionVerb(SCRATCH, rejecting)
    render(
      <ActionButtonPropertyBadge
        property={actionDef({ verbId: SCRATCH, recordInvokedAt: true })}
        value={null}
        context="card"
        pageId="page_1"
        pageTypeSlug="things"
      />
    )
    await act(async () => {
      fireEvent.click(screen.getByRole("button"))
    })
    await flushAsync()
    expect(errorSpy).toHaveBeenCalled()
    expect(mockSetProperty).not.toHaveBeenCalled()
    errorSpy.mockRestore()
  })
})
