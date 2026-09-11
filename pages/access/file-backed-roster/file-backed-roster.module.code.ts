export class RosterUnreachable extends Error {
  readonly why: string
  constructor(why: string) {
    super(
      `what is file-backed went unread, so nothing can be said to be file-backed or not: ${why}`
    )
    this.name = "RosterUnreachable"
    this.why = why
  }
}
