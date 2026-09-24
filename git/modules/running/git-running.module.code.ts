import {
  type Asked,
  ranAwaited as awaiting,
  type Said,
  said as saying,
} from "akasha/code/spawning/modules/running/running.module.code.ts"

export type Wanted = {
  readonly timeout?: number
  readonly stdin?: Uint8Array
}

export function argvFor(root: string, argv: readonly string[]): readonly string[] {
  return ["git", "-C", root, ...argv]
}

export function askedFor(wanted: Wanted): Asked {
  return {
    ...(wanted.timeout === undefined ? {} : { timeout: wanted.timeout }),
    ...(wanted.stdin === undefined ? {} : { stdin: wanted.stdin }),
  }
}

export function said(root: string, argv: readonly string[], wanted: Wanted = {}): string {
  return saying(argvFor(root, argv), askedFor(wanted))
}

export function told(root: string, argv: readonly string[], wanted: Wanted = {}): string | null {
  try {
    return said(root, argv, wanted)
  } catch {
    return null
  }
}

export async function ranAwaited(
  root: string,
  argv: readonly string[],
  wanted: Wanted = {}
): Promise<Said> {
  return await awaiting(argvFor(root, argv), askedFor(wanted))
}
