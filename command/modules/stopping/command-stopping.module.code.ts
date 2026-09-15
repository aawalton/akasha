const ALLOWED_SECONDS = "maxWallSeconds"

const SECONDS = 1000

export const ALLOWED = 120

export const MEASURED_ALLOWED = 1800

export type Watch = { readonly ended: () => void }

const LIVE = Symbol.for("akasha/command/modules/stopping/live")

type Holder = { live: Worker | null }

function isHolder(one: unknown): one is Holder {
  return typeof one === "object" && one !== null && "live" in one
}

function holder(): Holder {
  const found = Reflect.get(globalThis, LIVE)
  if (isHolder(found)) return found
  const made: Holder = { live: null }
  Reflect.set(globalThis, LIVE, made)
  return made
}

export function secondsIn(page: Record<string, unknown> | null): number | null {
  const said = page === null ? undefined : page[ALLOWED_SECONDS]
  if (said === null) return null
  return typeof said === "number" && said > 0 ? said : ALLOWED
}

export function saidOf(named: string, seconds: number): string {
  return (
    `\`${named}\` ran past the ${seconds} seconds its page allows, so the call was stopped. ` +
    `Ask Alan where you think that ceiling needs raising.`
  )
}

export function watchOf(seconds: number, said: string, pid: number): string {
  return (
    `setTimeout(() => { console.error(${JSON.stringify(said)}); ` +
    `process.kill(${pid}, "SIGKILL") }, ${seconds * SECONDS})`
  )
}

function workerFor(seconds: number, named: string): Worker {
  const body = watchOf(seconds, saidOf(named, seconds), process.pid)
  return new Worker(URL.createObjectURL(new Blob([body])))
}

export function watching(seconds: number | null, named: string): Watch {
  const one = holder()
  one.live = seconds === null ? null : workerFor(seconds, named)
  return {
    ended: () => {
      if (one.live !== null) one.live.terminate()
      one.live = null
    },
  }
}

export function allowedAgain(seconds: number, named: string): undefined {
  const one = holder()
  if (one.live !== null) {
    one.live.terminate()
    one.live = workerFor(seconds, named)
  }
}

export function allowedThrough(): undefined {
  const one = holder()
  if (one.live !== null) one.live.terminate()
  one.live = null
}
