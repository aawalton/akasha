export interface ReadEndFireArgs {
  readonly markReadOnEnd: boolean
  readonly hasCallback: boolean
  readonly isIntersecting: boolean
  readonly alreadyFired: boolean
}

export function decideReadEndFire(args: ReadEndFireArgs): boolean {
  return args.markReadOnEnd && args.hasCallback && args.isIntersecting && !args.alreadyFired
}
