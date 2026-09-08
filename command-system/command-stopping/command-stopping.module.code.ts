const TIMEOUT = "timeout"

const SECONDS = 1000

export const ALLOWED = 30

export type Held<T> = { readonly answer: T } | { readonly stopped: string }

export function secondsIn(page: Record<string, unknown> | null): number {
  const said = page === null ? null : page[TIMEOUT]
  return typeof said === "number" && said > 0 ? said : ALLOWED
}

export function saidOf(named: string, seconds: number): string {
  return `\`${named}\` ran past the ${seconds} seconds its page allows, so the call was stopped`
}

export async function heldTo<T>(
  seconds: number,
  named: string,
  work: T | Promise<T>
): Promise<Held<T>> {
  if (!(work instanceof Promise)) return { answer: work }
  let timer: ReturnType<typeof setTimeout> | undefined
  const past = new Promise<Held<T>>((keep) => {
    timer = setTimeout(() => keep({ stopped: saidOf(named, seconds) }), seconds * SECONDS)
  })
  try {
    return await Promise.race<Held<T>>([work.then((answer) => ({ answer })), past])
  } finally {
    clearTimeout(timer)
  }
}
