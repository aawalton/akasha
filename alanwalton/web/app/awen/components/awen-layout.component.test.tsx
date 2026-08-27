import { afterEach, describe, expect, test } from "bun:test"
import { type PagesUILinkProps, PagesUILinkProvider, PagesUIRouterProvider } from "@shared/pages-ui/router-context"
import { cleanup, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { ComponentType, ReactElement, ReactNode } from "react"
import type { SessionEnvelope } from "../lib/client-envelope"
import type { AwenGame } from "./awen-display"
import { AwenLayout } from "./awen-layout"

const StubLink: ComponentType<PagesUILinkProps> = ({ href, children, className }) => (
  <a href={href} className={className}>
    {children}
  </a>
)

function Harness({ children }: { children: ReactNode }) {
  return (
    <PagesUIRouterProvider value={{ pathname: "/game/awen", push: () => {}, replace: () => {} }}>
      <PagesUILinkProvider component={StubLink}>{children}</PagesUILinkProvider>
    </PagesUIRouterProvider>
  )
}

function renderLayout(ui: ReactElement) {
  return render(<Harness>{ui}</Harness>)
}

afterEach(() => {
  cleanup()
})

const STORY_GAME: AwenGame = {
  externalId: "game-ext-1",
  title: "Dragons (Demo)",
  display: {
    modules: { chapterProse: {}, storySoFar: { source: "turns" }, actionBox: {} },
    pollMs: 4000,
    tagline: "The story continues — what do you do?",
  },
}

const CRUNCHY_GAME: AwenGame = {
  externalId: "game-ext-2",
  title: "Tower (Demo)",
  display: {
    modules: {
      beatLog: { systemWindows: true },
      hud: {},
      sheet: {},
      storySoFar: { source: "stateLedger" },
      actionBox: {},
    },
    pollMs: 1800,
  },
}

function storyEnvelope(turns: NonNullable<SessionEnvelope["chapterProse"]>): SessionEnvelope {
  return {
    title: "Dragons (Demo)",
    chapterProse: turns,
    storySoFar: [],
  }
}

describe("AwenLayout — chapter-prose channel (session dimension)", () => {
  test("three current turns: every turn's title renders; 'newest' appears once and precedes the freshest turn", () => {
    const envelope = storyEnvelope([
      { id: "turn-1", title: "Turn Alpha", text: "the first beat" },
      { id: "turn-2", title: "Turn Beta", text: "the middle beat" },
      { id: "turn-3", title: "Turn Gamma", text: "the freshest beat" },
    ])
    renderLayout(<AwenLayout game={STORY_GAME} envelope={envelope} />)

    expect(screen.getByText("Turn Alpha")).not.toBeNull()
    expect(screen.getByText("Turn Beta")).not.toBeNull()
    const freshest = screen.getByText("Turn Gamma")
    expect(freshest).not.toBeNull()

    const dividers = screen.getAllByText("newest")
    expect(dividers).toHaveLength(1)
    const divider = dividers[0]
    if (divider === undefined) throw new Error("divider missing")

    const relation = divider.compareDocumentPosition(freshest)
    expect(relation & Node.DOCUMENT_POSITION_FOLLOWING).toBeGreaterThan(0)
  })

  test("empty chapterProse section: renders the 'not yet begun' empty state and no divider", () => {
    renderLayout(<AwenLayout game={STORY_GAME} envelope={storyEnvelope([])} />)
    expect(screen.getByText("The tale has not yet begun.")).not.toBeNull()
    expect(screen.queryByText("newest")).toBeNull()
  })

  test("the declared tagline renders under the title; a game without one shows none", () => {
    renderLayout(<AwenLayout game={STORY_GAME} envelope={storyEnvelope([])} />)
    expect(screen.getByText("The story continues — what do you do?")).not.toBeNull()
  })
})

const TITLES_HIDDEN_GAME: AwenGame = {
  externalId: "game-ext-3",
  title: "Partners (Demo)",
  display: {
    modules: { chapterProse: { titles: "hidden" }, actionBox: {} },
    pollMs: 4000,
  },
}

const MUTED_GAME: AwenGame = {
  externalId: "game-ext-4",
  title: "Partners (Demo)",
  display: {
    modules: { chapterProse: { pastTurns: "muted" }, actionBox: {} },
    pollMs: 4000,
  },
}

describe("AwenLayout — chapterProse render dials (#14521)", () => {
  const THREE = [
    { id: "turn-1", title: "Turn Alpha", text: "the first beat" },
    { id: "turn-2", title: "Turn Beta", text: "the middle beat" },
    { id: "turn-3", title: "Turn Gamma", text: "the freshest beat" },
  ]

  test('titles:"hidden": no per-turn heading renders, but the prose still does', () => {
    renderLayout(
      <AwenLayout
        game={TITLES_HIDDEN_GAME}
        envelope={{ title: "Partners (Demo)", chapterProse: THREE }}
      />
    )
    expect(screen.getByText("the first beat")).not.toBeNull()
    expect(screen.getByText("the freshest beat")).not.toBeNull()
    expect(screen.queryByText("Turn Alpha")).toBeNull()
    expect(screen.queryByText("Turn Beta")).toBeNull()
    expect(screen.queryByText("Turn Gamma")).toBeNull()
    expect(screen.getAllByText("newest")).toHaveLength(1)
  })

  const THREE_READ = [
    { id: "turn-1", title: "Turn Alpha", text: "the first beat", fullyRead: true },
    { id: "turn-2", title: "Turn Beta", text: "the middle beat", fullyRead: true },
    { id: "turn-3", title: "Turn Gamma", text: "the freshest beat" },
  ]

  test('pastTurns:"muted": FULLY-READ past turns de-emphasize (text-tertiary); the freshest stays full-contrast', () => {
    renderLayout(
      <AwenLayout
        game={MUTED_GAME}
        envelope={{ title: "Partners (Demo)", chapterProse: THREE_READ }}
      />
    )
    expect(screen.getByText("the first beat").className).toContain("text-tertiary")
    expect(screen.getByText("the middle beat").className).toContain("text-tertiary")
    const freshest = screen.getByText("the freshest beat")
    expect(freshest.className).toContain("text-primary")
    expect(freshest.className).not.toContain("text-tertiary")
  })

  test('pastTurns:"muted": an UNREAD past turn stays full-contrast (the #15073 read-aware fix)', () => {
    const mixed = [
      { id: "turn-1", title: "Turn Alpha", text: "the first beat", fullyRead: true },
      { id: "turn-2", title: "Turn Beta", text: "the middle beat" },
      { id: "turn-3", title: "Turn Gamma", text: "the freshest beat" },
    ]
    renderLayout(
      <AwenLayout game={MUTED_GAME} envelope={{ title: "Partners (Demo)", chapterProse: mixed }} />
    )
    expect(screen.getByText("the first beat").className).toContain("text-tertiary")
    expect(screen.getByText("the middle beat").className).toContain("text-primary")
    expect(screen.getByText("the middle beat").className).not.toContain("text-tertiary")
  })

  test("undeclared dials: prose renders at full contrast with titles shown (byte-identical to today)", () => {
    renderLayout(<AwenLayout game={STORY_GAME} envelope={storyEnvelope(THREE)} />)
    expect(screen.getByText("Turn Alpha")).not.toBeNull()
    expect(screen.getByText("the first beat").className).toContain("text-primary")
    expect(screen.getByText("the first beat").className).not.toContain("text-tertiary")
  })
})

describe("AwenLayout — frame chrome (#15769)", () => {
  test("the frame header renders a Back affordance for every game", () => {
    renderLayout(<AwenLayout game={STORY_GAME} envelope={storyEnvelope([])} />)
    expect(screen.getAllByRole("button", { name: /^back$/i }).length).toBeGreaterThan(0)
  })

  test("the status-panel drawer trigger renders ONLY when the game declares an aside", () => {
    const crunchy: SessionEnvelope = {
      title: "Tower (Demo)",
      beatLog: null,
      hud: null,
      sheet: null,
      storySoFar: [],
    }
    renderLayout(<AwenLayout game={CRUNCHY_GAME} envelope={crunchy} />)
    expect(screen.getAllByRole("button", { name: /open menu/i }).length).toBeGreaterThan(0)
    cleanup()

    renderLayout(<AwenLayout game={STORY_GAME} envelope={storyEnvelope([])} />)
    expect(screen.queryByRole("button", { name: /open menu/i })).toBeNull()
    expect(screen.getByPlaceholderText("What do you do?")).not.toBeNull()
  })
})

describe("AwenLayout — module presence is declaration-driven", () => {
  test("a null beatLog section renders the 'no session' empty state; undeclared channels leave no trace", () => {
    const envelope: SessionEnvelope = {
      title: "Tower (Demo)",
      beatLog: null,
      hud: null,
      sheet: null,
      storySoFar: [],
    }
    renderLayout(<AwenLayout game={CRUNCHY_GAME} envelope={envelope} />)
    expect(screen.getByText("No session is live yet.")).not.toBeNull()
    expect(screen.queryByText("The tale has not yet begun.")).toBeNull()
    expect(screen.queryByText("The story continues — what do you do?")).toBeNull()
  })

  test("a story declaration renders no crunchy empty state", () => {
    renderLayout(<AwenLayout game={STORY_GAME} envelope={storyEnvelope([])} />)
    expect(screen.queryByText("No session is live yet.")).toBeNull()
  })
})
