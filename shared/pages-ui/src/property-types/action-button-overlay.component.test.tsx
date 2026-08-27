import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test"
import { BadgeLayoutProvider } from "@shared/design-badges/components/badge-layout-context"
import { cleanup, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { ActionVerbContext } from "../action-verbs/action-verb-registry"
import type { PropertyDefinition } from "@shared/pages-core/types"

mock.module("../supabase/use-set-property-optimistic", () => ({
  useSetPropertyOptimistic: () => () => {},
}))

const { ActionButtonPropertyBadge } = await import("./action-button")
const { registerActionVerb, unregisterActionVerb } = await import(
  "../action-verbs/action-verb-registry"
)

const SCRATCH = "scratch-verb"

function actionDef(config: PropertyDefinition["config"], title = "Do It"): PropertyDefinition {
  return { id: "act", title, type: "action-button", config }
}

let handler = mock((_ctx: ActionVerbContext) => {})

beforeEach(() => {
  handler = mock((_ctx: ActionVerbContext) => {})
  registerActionVerb(SCRATCH, handler)
})

afterEach(() => {
  cleanup()
  unregisterActionVerb(SCRATCH)
})

describe("ActionButtonPropertyBadge — resolvePresentation overlay (#14285)", () => {
  it("overlay label overrides config.label", () => {
    registerActionVerb(SCRATCH, handler, () => ({ label: "Overlaid" }))
    render(
      <ActionButtonPropertyBadge
        property={actionDef({ verbId: SCRATCH, label: "Static" })}
        value={null}
        context="card"
        pageId="page_1"
        pageTypeSlug="things"
      />
    )
    const button = screen.getByRole("button")
    expect(button.textContent).toContain("Overlaid")
    expect(button.textContent).not.toContain("Static")
  })

  it("overlay disabled:true disables an otherwise-enabled button", () => {
    registerActionVerb(SCRATCH, handler, () => ({ disabled: true }))
    render(
      <ActionButtonPropertyBadge
        property={actionDef({ verbId: SCRATCH, label: "Press" })}
        value={null}
        context="card"
        pageId="page_1"
        pageTypeSlug="things"
      />
    )
    expect(screen.getByRole("button").hasAttribute("disabled")).toBe(true)
  })

  it("overlay disabled:false can NOT force-enable a base-disabled button (add-only)", () => {
    registerActionVerb(SCRATCH, handler, () => ({ disabled: false }))
    render(
      <ActionButtonPropertyBadge
        property={actionDef({ verbId: SCRATCH, label: "Press" })}
        value={null}
        context="card"
        pageTypeSlug="things"
      />
    )
    expect(screen.getByRole("button").hasAttribute("disabled")).toBe(true)
  })

  it("overlay icon replaces the dispatcher context icon with an svg glyph", () => {
    registerActionVerb(SCRATCH, handler, () => ({ icon: "lock" }))
    render(
      <BadgeLayoutProvider icon={<span data-testid="probe-icon" />}>
        <ActionButtonPropertyBadge
          property={actionDef({ verbId: SCRATCH, label: "Lock" })}
          value={null}
          context="card"
          pageId="page_1"
          pageTypeSlug="things"
        />
      </BadgeLayoutProvider>
    )
    const button = screen.getByRole("button")
    expect(button.firstElementChild?.tagName.toLowerCase()).toBe("svg")
    expect(screen.queryByTestId("probe-icon")).toBeNull()
    expect(button.textContent).toContain("Lock")
  })

  it("toggle-shaped verb flips label + icon by ctx.data across renders", () => {
    const resolve = (ctx: ActionVerbContext) =>
      ctx.data["locked"] === true
        ? { label: "Unlock", icon: "unlock" }
        : { label: "Lock", icon: "lock" }
    registerActionVerb(SCRATCH, handler, resolve)

    const { rerender } = render(
      <ActionButtonPropertyBadge
        property={actionDef({ verbId: SCRATCH, label: "Static" })}
        value={null}
        context="card"
        pageId="page_1"
        pageTypeSlug="things"
        pageData={{ locked: false }}
      />
    )
    expect(screen.getByRole("button").textContent).toContain("Lock")

    rerender(
      <ActionButtonPropertyBadge
        property={actionDef({ verbId: SCRATCH, label: "Static" })}
        value={null}
        context="card"
        pageId="page_1"
        pageTypeSlug="things"
        pageData={{ locked: true }}
      />
    )
    expect(screen.getByRole("button").textContent).toContain("Unlock")
  })

  it("a verb with NO resolvePresentation renders exactly as today (back-compat pin)", () => {
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
    expect(button.hasAttribute("disabled")).toBe(false)
    expect(button.textContent).toContain("Plain")
  })
})
