export const STATES = {
  IDLE: "IDLE",
  SEARCHING: "SEARCHING",
  JOINING: "JOINING",
} as const

export type GroupFinderState = (typeof STATES)[keyof typeof STATES]

export const EVENTS = {
  START_SEARCH: "START_SEARCH",
  STOP_SEARCH: "STOP_SEARCH",
  JOIN_GROUP: "JOIN_GROUP",
} as const

export type GroupFinderEvent = (typeof EVENTS)[keyof typeof EVENTS]

export type StateCallback<D> = (
  this: void,
  oldState: GroupFinderState,
  data: D | undefined
) => undefined

export type GroupFinderStateMachine<D> = {
  readonly RegisterCallback: (
    this: void,
    state: GroupFinderState,
    callback: StateCallback<D>
  ) => undefined
  readonly GetCurrentState: (this: void) => GroupFinderState
  readonly HandleEvent: (this: void, event: GroupFinderEvent, data?: D) => boolean
}

const TRANSITIONS: Record<GroupFinderState, Partial<Record<GroupFinderEvent, GroupFinderState>>> = {
  [STATES.IDLE]: {
    [EVENTS.STOP_SEARCH]: STATES.IDLE,
    [EVENTS.START_SEARCH]: STATES.SEARCHING,
  },
  [STATES.SEARCHING]: {
    [EVENTS.STOP_SEARCH]: STATES.IDLE,
    [EVENTS.JOIN_GROUP]: STATES.JOINING,
  },
  [STATES.JOINING]: {
    [EVENTS.STOP_SEARCH]: STATES.IDLE,
    [EVENTS.START_SEARCH]: STATES.SEARCHING,
  },
}

export function createStateMachine<D>(this: void): GroupFinderStateMachine<D> {
  let currentState: GroupFinderState = STATES.IDLE
  const stateCallbacks: Partial<Record<GroupFinderState, StateCallback<D>[]>> = {}
  return {
    RegisterCallback: (state, callback) => {
      const registered = stateCallbacks[state] ?? []
      stateCallbacks[state] = registered
      registered.push(callback)
      return undefined
    },
    GetCurrentState: () => currentState,
    HandleEvent: (event, data) => {
      const newState = TRANSITIONS[currentState][event]
      if (newState === undefined) return false
      const oldState = currentState
      currentState = newState
      for (const callback of stateCallbacks[newState] ?? []) callback(oldState, data)
      return true
    },
  }
}
