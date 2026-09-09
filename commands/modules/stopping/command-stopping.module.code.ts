const TIMEOUT = "timeout"

const SECONDS = 1000

export const ALLOWED = 120

export const MEASURED_ALLOWED = 1800

export type Watch = { readonly ended: () => void }

let live: Worker | null = null

export function secondsIn(page: Record<string, unknown> | null): number {
  const said = page === null ? null : page[TIMEOUT]
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

export function watching(seconds: number, named: string): Watch {
  live = workerFor(seconds, named)
  return {
    ended: () => {
      if (live !== null) live.terminate()
      live = null
    },
  }
}

export function allowedAgain(seconds: number, named: string): undefined {
  if (live !== null) {
    live.terminate()
    live = workerFor(seconds, named)
  }
}

export function allowedThrough(): undefined {
  if (live !== null) live.terminate()
  live = null
}
