import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"

const TMUX_CEILING_MS = 10_000

async function tmux(args: readonly string[]): Promise<number> {
  const ran = Bun.spawn(["tmux", ...args], { stdin: "ignore", stdout: "ignore", stderr: "ignore" })
  const timer = setTimeout(() => {
    ran.kill()
  }, TMUX_CEILING_MS)
  try {
    return await ran.exited
  } finally {
    clearTimeout(timer)
  }
}

export async function sessionHeld(name: string): Promise<boolean> {
  return (await tmux(["has-session", "-t", `=${name}`])) === 0
}

export async function endedSession(name: string): Promise<boolean> {
  if (!(await sessionHeld(name))) return false
  await tmux(["kill-session", "-t", `=${name}`])
  return !(await sessionHeld(name))
}
