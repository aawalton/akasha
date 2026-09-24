export interface RemoteControlQuestion {
  readonly headless: boolean
}

export function decideRemoteControl(question: RemoteControlQuestion): boolean {
  return !question.headless
}
