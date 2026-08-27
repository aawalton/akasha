import { mock } from "bun:test"
import { type Page, Page as PageBrand, type PageWhere } from "@shared/pages-core/page-types"
import type { ResolveQuestionArgs, ResolveQuestionDeps } from "./resolve-question.server"

export const ASKED_BY = "asker-page-uuid"
export const AGENT_ID = "agent-1"
export const OWNER_ID = "owner-user-1"
export const FOREIGN_ID = "intruder-user-2"
export const ACTIONS: ResolveQuestionArgs["action"][] = ["answer", "dismiss"]

export const realPage = PageBrand

export type State = {
  calls: readonly string[]
  sendArgs: readonly unknown[]
  patchSet: Record<string, unknown> | null
  patchCalled: boolean
  patchWhere: unknown
  selectedKeys: readonly string[] | null
  getPageRow: Page | null
  personaTargets: readonly { id: string; slug: string }[]
  insertThrows: boolean
  getPagesRows: readonly Page[]
}

export const state: State = {
  calls: [],
  sendArgs: [],
  patchSet: null,
  patchCalled: false,
  patchWhere: null,
  selectedKeys: null,
  getPageRow: null,
  personaTargets: [],
  insertThrows: false,
  getPagesRows: [],
}

export const listPersonaTargets = mock(async () => state.personaTargets)

export const writePage = mock(
  async (
    _pageType: string,
    _name: string,
    values: Readonly<Record<string, unknown>>,
    _writer: string
  ) => {
    state.calls = [...state.calls, "deliver"]
    state.sendArgs = [values]
    if (state.insertThrows) throw new Error("asker offline")
    return { ok: true as const, at: "2026-07-15T12:00:00.000Z" }
  }
)

export const getPageStub = mock(async (args: { where?: PageWhere; select?: readonly string[] }) => {
  state.selectedKeys = args.select ?? null
  const owner = args.where?.find((t) => "key" in t && t.key === "userId")
  if (owner === undefined) return state.getPageRow
  return "eq" in owner && owner.eq === OWNER_ID ? state.getPageRow : null
})

export const patchPage = mock(
  async (args: { pageTypeSlug?: string; where?: unknown; set: Record<string, unknown> }) => {
    state.calls = [...state.calls, "patch"]
    state.patchCalled = true
    state.patchSet = args.set
    state.patchWhere = args.where
    return null
  }
)

export const getPagesStub = mock(async (_args: unknown) => ({
  rows: state.getPagesRows,
  nextCursor: null,
  count: null,
}))

export const deps: ResolveQuestionDeps = {
  writePage,
  listPersonaTargets,
  getPage: getPageStub,
  getPages: getPagesStub,
  patchPage,
}

export function reset(): undefined {
  state.calls = []
  state.sendArgs = []
  state.patchSet = null
  state.patchCalled = false
  state.patchWhere = null
  state.selectedKeys = null
  state.getPageRow = realPage({
    id: "q1",
    title: "Ship it?",
    slug: "ship-it",
    askedBy: ASKED_BY,
    status: "open",
    userId: OWNER_ID,
  })
  state.personaTargets = [{ id: ASKED_BY, slug: "asker-persona" }]
  state.insertThrows = false
  state.getPagesRows = []
  listPersonaTargets.mockClear()
  writePage.mockClear()
  getPageStub.mockClear()
  patchPage.mockClear()
  getPagesStub.mockClear()
}

export function deliveredContent(index = 0): string {
  const arg = state.sendArgs[index]
  const body = typeof arg === "object" && arg !== null && "body" in arg ? arg.body : undefined
  return String(body)
}

export type ReqOver = Partial<ResolveQuestionArgs> & Pick<ResolveQuestionArgs, "action">

export function req(over: ReqOver): ResolveQuestionArgs {
  return {
    questionId: "q1",
    sessionUserId: OWNER_ID,
    sender: { accountUserId: OWNER_ID, personSlug: null },
    ...over,
  }
}
