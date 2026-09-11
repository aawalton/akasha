const FORWARDED = ["SIGTERM", "SIGINT"] as const
const REFUSED_EXIT = 2

export async function runBinary(argv: readonly string[]): Promise<never> {
  if (argv.length === 0) {
    process.stderr.write("binary-running: name the binary to run\n")
    return process.exit(REFUSED_EXIT)
  }

  const child = Bun.spawn([...argv], {
    stdio: ["inherit", "inherit", "inherit"],
    env: process.env,
  })

  for (const signal of FORWARDED) {
    process.on(signal, () => {
      child.kill(signal)
    })
  }

  return process.exit(await child.exited)
}
