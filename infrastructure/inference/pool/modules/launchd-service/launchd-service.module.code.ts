function launchdTarget(uid: number, label: string): string {
  return `gui/${uid}/${label}`
}

async function runLaunchctl(args: readonly string[]): Promise<{ code: number; stderr: string }> {
  const proc = Bun.spawn(["launchctl", ...args], { stdout: "ignore", stderr: "pipe" })
  const stderr = await new Response(proc.stderr).text()
  const code = await proc.exited
  return { code, stderr }
}

export async function startService(uid: number, label: string): Promise<void> {
  const target = launchdTarget(uid, label)
  const { code, stderr } = await runLaunchctl(["kickstart", target])
  if (code !== 0) {
    throw new Error(`launchctl kickstart ${target} failed (exit ${code}): ${stderr.trim()}`)
  }
}

export async function stopService(uid: number, label: string): Promise<void> {
  const target = launchdTarget(uid, label)
  const { code, stderr } = await runLaunchctl(["kill", "SIGTERM", target])
  if (code !== 0) {
    console.error(
      `[traffic-cop] launchctl kill ${target} non-zero (exit ${code}): ${stderr.trim()}`
    )
  }
}

export async function killService(uid: number, label: string): Promise<void> {
  const target = launchdTarget(uid, label)
  const { code, stderr } = await runLaunchctl(["kill", "SIGKILL", target])
  if (code !== 0) {
    console.error(
      `[traffic-cop] launchctl kill SIGKILL ${target} non-zero (exit ${code}): ${stderr.trim()}`
    )
  }
}
