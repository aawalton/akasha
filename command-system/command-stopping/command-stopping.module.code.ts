const TIMEOUT = "timeout"

const SECONDS = 1000

export const ALLOWED = 30

export type Watch = { readonly ended: () => void }

export function secondsIn(page: Record<string, unknown> | null): number {
  const said = page === null ? null : page[TIMEOUT]
  return typeof said === "number" && said > 0 ? said : ALLOWED
}

export function saidOf(named: string, seconds: number): string {
  return `\`${named}\` ran past the ${seconds} seconds its page allows, so the call was stopped`
}

export function watchOf(seconds: number, said: string, pid: number): string {
  return (
    `setTimeout(() => { console.error(${JSON.stringify(said)}); ` +
    `process.kill(${pid}, "SIGKILL") }, ${seconds * SECONDS})`
  )
}

export function watching(seconds: number, named: string): Watch {
  const body = watchOf(seconds, saidOf(named, seconds), process.pid)
  const watch = new Worker(URL.createObjectURL(new Blob([body])))
  return { ended: () => watch.terminate() }
}
