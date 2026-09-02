import { assertNever } from "@akasha/utils-narrow/assert-never"

export type BrowsePhase = "idle" | "searching" | "cooldown" | "done"

export interface BrowseState {
  readonly queue: readonly number[]
  readonly currentGuildId: number | undefined
  readonly highestPage: number | undefined
  readonly hasMore: boolean
  readonly awaiting: boolean
  readonly phase: BrowsePhase
  readonly error: string | undefined
}

export const INITIAL_BROWSE_STATE: BrowseState = {
  queue: [],
  currentGuildId: undefined,
  highestPage: undefined,
  hasMore: false,
  awaiting: false,
  phase: "idle",
  error: undefined,
}

export type BrowseEvent =
  | { readonly kind: "start"; readonly guildIds: readonly number[] }
  | { readonly kind: "searchExecuted" }
  | {
      readonly kind: "pageReceived"
      readonly guildId: number
      readonly currentPage: number
      readonly hasMorePages: boolean
    }
  | { readonly kind: "cooldownReady" }
  | { readonly kind: "searchError"; readonly code: string }
  | { readonly kind: "cancel" }

export type BrowseAction =
  | { readonly kind: "executeSearch"; readonly guildId: number; readonly page: number }
  | { readonly kind: "selectGuild"; readonly guildId: number }
  | { readonly kind: "complete" }
  | { readonly kind: "noop" }

export interface BrowseDecision {
  readonly state: BrowseState
  readonly actions: readonly BrowseAction[]
}

const NOOP: BrowseDecision["actions"] = [{ kind: "noop" }]

export function decideBrowseNext(state: BrowseState, event: BrowseEvent): BrowseDecision {
  switch (event.kind) {
    case "start":
      return onStart(event.guildIds)
    case "searchExecuted":
      return {
        state: { ...state, awaiting: true, phase: "searching" },
        actions: NOOP,
      }
    case "pageReceived":
      return onPageReceived(state, event.currentPage, event.hasMorePages)
    case "cooldownReady":
      return onCooldownReady(state)
    case "searchError":
      return {
        state: { ...state, awaiting: false, error: event.code },
        actions: NOOP,
      }
    case "cancel":
      return {
        state: { ...state, awaiting: false, phase: "done" },
        actions: NOOP,
      }
    default:
      return assertNever(event)
  }
}

function onStart(guildIds: readonly number[]): BrowseDecision {
  const first = guildIds[0]
  if (first === undefined) {
    return {
      state: { ...INITIAL_BROWSE_STATE, phase: "done" },
      actions: [{ kind: "complete" }],
    }
  }
  return {
    state: {
      queue: guildIds.slice(1),
      currentGuildId: first,
      highestPage: undefined,
      hasMore: false,
      awaiting: false,
      phase: "searching",
      error: undefined,
    },
    actions: [
      { kind: "selectGuild", guildId: first },
      { kind: "executeSearch", guildId: first, page: 0 },
    ],
  }
}

function onPageReceived(
  state: BrowseState,
  currentPage: number,
  hasMorePages: boolean
): BrowseDecision {
  const guildId = state.currentGuildId
  const settled: BrowseState = {
    ...state,
    awaiting: false,
    highestPage: currentPage,
  }
  if (guildId === undefined) {
    return { state: settled, actions: NOOP }
  }
  if (hasMorePages) {
    return {
      state: { ...settled, hasMore: true, phase: "cooldown" },
      actions: NOOP,
    }
  }
  return advanceGuild({ ...settled, hasMore: false })
}

function onCooldownReady(state: BrowseState): BrowseDecision {
  if (state.awaiting) {
    return { state, actions: NOOP }
  }
  if (
    state.phase === "cooldown" &&
    state.currentGuildId !== undefined &&
    state.hasMore &&
    state.highestPage !== undefined
  ) {
    const nextPage = state.highestPage + 1
    return {
      state: { ...state, phase: "searching" },
      actions: [{ kind: "executeSearch", guildId: state.currentGuildId, page: nextPage }],
    }
  }
  return { state, actions: NOOP }
}

function advanceGuild(state: BrowseState): BrowseDecision {
  const next = state.queue[0]
  if (next === undefined) {
    return {
      state: {
        ...state,
        currentGuildId: undefined,
        hasMore: false,
        phase: "done",
      },
      actions: [{ kind: "complete" }],
    }
  }
  return {
    state: {
      ...state,
      queue: state.queue.slice(1),
      currentGuildId: next,
      highestPage: undefined,
      hasMore: false,
      phase: "searching",
      error: undefined,
    },
    actions: [
      { kind: "selectGuild", guildId: next },
      { kind: "executeSearch", guildId: next, page: 0 },
    ],
  }
}
