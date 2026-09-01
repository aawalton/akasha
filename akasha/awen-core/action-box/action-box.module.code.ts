export interface ActionMessage {
  readonly text: string
  readonly submittedAt: number
}

export function pendingActions(): readonly ActionMessage[] {
  return []
}

export function actionArrivals(): readonly number[] {
  return []
}

export function clearActions(): number {
  return 0
}

export function actionBoxIsRebuilding(): Error {
  return new Error(
    "the action box takes no player action: it is being rebuilt, and until it is there is " +
      "nowhere for one to land"
  )
}
