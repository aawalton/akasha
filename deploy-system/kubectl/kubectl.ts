export interface Ran {
  readonly argv: readonly string[]
  readonly code: number
  readonly stdout: string
  readonly stderr: string
}

export function runKubectl(argv: readonly string[]): Ran {
  const ran = Bun.spawnSync(["kubectl", ...argv], { stdout: "pipe", stderr: "pipe" })
  return {
    argv,
    code: ran.exitCode,
    stdout: new TextDecoder().decode(ran.stdout),
    stderr: new TextDecoder().decode(ran.stderr),
  }
}

export function runKubectlOn(argv: readonly string[], input: string): Ran {
  const ran = Bun.spawnSync(["kubectl", ...argv], {
    stdin: new TextEncoder().encode(input),
    stdout: "pipe",
    stderr: "pipe",
  })
  return {
    argv,
    code: ran.exitCode,
    stdout: new TextDecoder().decode(ran.stdout),
    stderr: new TextDecoder().decode(ran.stderr),
  }
}
