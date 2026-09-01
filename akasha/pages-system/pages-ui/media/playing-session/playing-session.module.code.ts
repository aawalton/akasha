import type { Medium } from "@akasha/pages-core/media-formats"
import { assertNever } from "@akasha/utils-narrow/assert-never"

export type ActiveSessionInit = {
  readonly pageId: string
  readonly pageTypeSlug: string
  readonly pageHref: string
  readonly title: string
  readonly medium: Medium
  readonly variant: string
  readonly speed: number
  readonly nextHref: string | null
  readonly fromSentence?: number
  readonly resumeFraction?: number
  readonly length?: number
  readonly currentProgress?: number
  readonly progressPropertyId?: string
  readonly text?: string
}

export type PlayingSessionState =
  | { readonly status: "idle" }
  | ({ readonly status: "active" } & ActiveSessionInit)

export const IDLE_PLAYING_SESSION: PlayingSessionState = { status: "idle" }

export type PlayingSessionAction =
  | { readonly type: "start"; readonly session: ActiveSessionInit }
  | { readonly type: "advance"; readonly next: ActiveSessionInit | null }
  | { readonly type: "stop" }
  | { readonly type: "setVariant"; readonly variant: string }
  | { readonly type: "setSpeed"; readonly speed: number }

export function playingSessionReducer(
  state: PlayingSessionState,
  action: PlayingSessionAction
): PlayingSessionState {
  switch (action.type) {
    case "start":
      return { status: "active", ...action.session }
    case "advance":
      if (state.status !== "active") return IDLE_PLAYING_SESSION
      return action.next == null ? IDLE_PLAYING_SESSION : { status: "active", ...action.next }
    case "stop":
      return IDLE_PLAYING_SESSION
    case "setVariant":
      if (state.status !== "active" || state.variant === action.variant) return state
      return { ...state, variant: action.variant }
    case "setSpeed":
      if (state.status !== "active" || state.speed === action.speed) return state
      return { ...state, speed: action.speed }
    default:
      return assertNever(action)
  }
}
