import { afterEach, describe, expect, mock, test } from "bun:test"
import { OPEN_QUESTION_STATUS } from "@shared/open-questions"
import { act, cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { MemoryRouter } from "react-router"
import { z } from "zod"
import { createFetchStub } from "~/lib/fetch-stub"

const SentBodySchema = z.record(z.string(), z.unknown())

type Persona = {
  id: string
  handle: string | null
  name: string
  avatarUrl: string | null
  chatHref: string | null
}

const PERSONA: Persona = {
  id: "persona-1",
  handle: null,
  name: "Aura",
  avatarUrl: "/api/image/avatar-1",
  chatHref: "/persona/aura-persona1",
}

mock.module("@shared/pages-ui/supabase/use-page", () => ({
  usePage: () => ({ page: undefined }),
}))

const { default: QuestionDetail } = await import("./question-detail")

afterEach(() => {
  cleanup()
})

function question(id: string, title: string) {
  return {
    id,
    title,
    context: null,
    options: [],
    links: [],
    status: OPEN_QUESTION_STATUS,
    askedAtMs: 0,
  }
}

describe("QuestionDetail per-question state reset (#15567 item 1)", () => {
  test("advancing to a new question id clears the typed free-text answer", () => {
    const { rerender } = render(
      <MemoryRouter>
        <QuestionDetail question={question("q-1", "First?")} persona={null} />
      </MemoryRouter>
    )

    const textarea = screen.getByLabelText<HTMLTextAreaElement>("Response")
    fireEvent.change(textarea, { target: { value: "my draft answer" } })
    expect(screen.getByLabelText<HTMLTextAreaElement>("Response").value).toBe("my draft answer")

    rerender(
      <MemoryRouter>
        <QuestionDetail question={question("q-2", "Second?")} persona={null} />
      </MemoryRouter>
    )
    expect(screen.getByLabelText<HTMLTextAreaElement>("Response").value).toBe("")
    expect(screen.getByText("Second?")).toBeDefined()
  })
})

function renderOpen(persona: Persona | null) {
  return render(
    <MemoryRouter>
      <QuestionDetail question={question("q-ia", "Why did you pick blue?")} persona={persona} />
    </MemoryRouter>
  )
}

describe("QuestionDetail IA + chat-tap + dismiss style (#15567 items 2, 4, 5)", () => {
  test("item 2: the persona/avatar row renders before the question title", () => {
    renderOpen(PERSONA)
    const name = screen.getByText("Aura")
    const title = screen.getByText("Why did you pick blue?")
    expect(name.compareDocumentPosition(title) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  test("item 4: the persona row is the chat link and the standalone prompt is gone", () => {
    renderOpen(PERSONA)
    const link = screen.getByText("Aura").closest("a")
    expect(link).not.toBeNull()
    expect(link?.getAttribute("href")).toBe("/persona/aura-persona1")
    expect(screen.queryByText(/Not enough to answer/i)).toBeNull()
  })

  test("item 4: with no chat href the row is not a link", () => {
    renderOpen({ ...PERSONA, chatHref: null })
    expect(screen.getByText("Aura").closest("a")).toBeNull()
  })

  test("item 5: Dismiss uses the solid (secondary) style, not the ghost (tertiary) style", () => {
    renderOpen(PERSONA)
    const dismiss = screen.getByRole("button", { name: "Dismiss" })
    expect(dismiss.className).toContain("text-secondary")
    expect(dismiss.className).not.toContain("text-tertiary")
    expect(dismiss.className).not.toContain("bg-transparent")
  })

  test("item 3 (web pass-through): a `/`-relative avatar url is unchanged on web (API_ORIGIN empty)", () => {
    const { container } = renderOpen(PERSONA)
    const img = container.querySelector("img")
    expect(img?.getAttribute("src")).toBe("/api/image/avatar-1")
  })
})

describe("QuestionDetail review links (#15793)", () => {
  const withLinks = (id: string) => ({
    ...question(id, "Check the render"),
    links: [
      {
        label: "On web",
        url: "https://alanwalton.com/question/x-12345678",
        platform: "web" as const,
      },
      { label: "In app", url: "/question/x-12345678", platform: "native" as const },
    ],
  })

  test("on mobile web: web card opens a new tab, native card deep-links to the app", () => {
    render(
      <MemoryRouter>
        <QuestionDetail question={withLinks("q-links")} persona={null} />
      </MemoryRouter>
    )
    expect(screen.getByText("Web ↗")).toBeDefined()
    expect(screen.getByText("Native ↗")).toBeDefined()

    const web = screen.getByText("On web").closest("a")
    expect(web).not.toBeNull()
    expect(web?.getAttribute("href")).toBe("https://alanwalton.com/question/x-12345678")
    expect(web?.getAttribute("target")).toBe("_blank")
    expect(web?.getAttribute("rel")).toContain("noopener")

    const native = screen.getByText("In app").closest("a")
    expect(native).not.toBeNull()
    expect(native?.getAttribute("href")).toBe("alanwalton://localhost/question/x-12345678")
    expect(screen.getByText("In app").closest("button")).toBeNull()
    expect(native?.getAttribute("target")).toBeNull()
  })

  test("a native link that is not a safe in-app path renders disabled, not launchable", () => {
    render(
      <MemoryRouter>
        <QuestionDetail
          question={{
            ...question("q-unsafe", "Check the render"),
            links: [{ label: "Sketchy", url: "https://evil.com/x", platform: "native" as const }],
          }}
          persona={null}
        />
      </MemoryRouter>
    )
    const card = screen.getByText("Sketchy").closest("[aria-disabled='true']")
    expect(card).not.toBeNull()
    expect(screen.getByText("Sketchy").closest("a")).toBeNull()
  })
})

describe("QuestionDetail option tap carries its index (#17045)", () => {
  const originalFetch = globalThis.fetch
  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  function withOptions(options: readonly string[]) {
    return { ...question("q-opt", "Still on the same block?"), options }
  }

  async function flushClick(click: () => void): Promise<void> {
    await act(async () => {
      click()
      await new Promise((resolve) => setTimeout(resolve, 0))
    })
  }

  function captureBody(): () => Record<string, unknown> {
    let body = "{}"
    globalThis.fetch = createFetchStub(
      mock((_input: RequestInfo | URL, init?: RequestInit) => {
        body = typeof init?.body === "string" ? init.body : "{}"
        return Promise.resolve(
          new Response(JSON.stringify({ ok: true, nextHref: null }), {
            status: 200,
            headers: { "content-type": "application/json" },
          })
        )
      })
    )
    return () => SentBodySchema.parse(JSON.parse(body))
  }

  test("tapping the SECOND option sends index 1, not just its text", async () => {
    const sent = captureBody()
    render(
      <MemoryRouter>
        <QuestionDetail question={withOptions(["Yes", "No, something else"])} persona={null} />
      </MemoryRouter>
    )

    await flushClick(() => fireEvent.click(screen.getByText("No, something else")))
    expect(sent().answeredOptionIndex).toBe(1)
    expect(sent().content).toBe("No, something else")
  })

  test("tapping the FIRST option sends index 0 — the falsy index", async () => {
    const sent = captureBody()
    render(
      <MemoryRouter>
        <QuestionDetail question={withOptions(["Yes", "No, something else"])} persona={null} />
      </MemoryRouter>
    )

    await flushClick(() => fireEvent.click(screen.getByText("Yes")))
    expect(Object.hasOwn(sent(), "answeredOptionIndex")).toBe(true)
    expect(sent().answeredOptionIndex).toBe(0)
  })

  test("the free-text form sends no index, even typing an option's exact text", async () => {
    const sent = captureBody()
    render(
      <MemoryRouter>
        <QuestionDetail question={withOptions(["Yes", "No, something else"])} persona={null} />
      </MemoryRouter>
    )

    fireEvent.change(screen.getByLabelText("Response"), { target: { value: "Yes" } })
    await flushClick(() => fireEvent.click(screen.getByText("Answer")))
    expect(sent().content).toBe("Yes")
    expect(Object.hasOwn(sent(), "answeredOptionIndex")).toBe(false)
  })
})
