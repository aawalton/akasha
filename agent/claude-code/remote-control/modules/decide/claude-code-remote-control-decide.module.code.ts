export interface RemoteControlQuestion {
  readonly headless: boolean
}

export function decideRemoteControl(question: RemoteControlQuestion): boolean {
  return !question.headless
}

export interface RemoteControlSeatQuestion {
  readonly seat: string
  readonly question: RemoteControlQuestion
}

export interface RemoteControlVerdict {
  readonly seat: string
  readonly remoteControl: boolean
}

export function decideRemoteControlBatch(
  seats: readonly RemoteControlSeatQuestion[]
): RemoteControlVerdict[] {
  return seats.map(({ seat, question }) => ({ seat, remoteControl: decideRemoteControl(question) }))
}
