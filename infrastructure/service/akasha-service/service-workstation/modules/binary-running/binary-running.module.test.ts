import { expect, test } from "bun:test"

const CODE = `${import.meta.dir}/binary-running.module.code.ts`

const TERM_EXIT = 143
const REFUSED_EXIT = 2

type Wrapper = Bun.Subprocess<"ignore", "pipe", "pipe">

function wrapping(argv: readonly string[]): Wrapper {
  const source =
    `import { runBinary } from ${JSON.stringify(CODE)}\n` +
    `await runBinary(${JSON.stringify(argv)})\n`
  return Bun.spawn(["bun", "-e", source], { stdin: "ignore", stdout: "pipe", stderr: "pipe" })
}

async function started(kid: Wrapper): Promise<void> {
  const reader = kid.stdout.getReader()
  await reader.read()
  reader.releaseLock()
}

const waiting = (trap: string): readonly string[] => [
  "sh",
  "-c",
  `${trap}printf up; while :; do sleep 0.02; done`,
]

test("a binary exiting other than zero leaves the service on that same code", async () => {
  expect(await wrapping(["sh", "-c", "exit 23"]).exited).toBe(23)
})

test("a binary exiting zero leaves the service on zero", async () => {
  expect(await wrapping(["true"]).exited).toBe(0)
})

test("what the binary says reaches the streams the service was given", async () => {
  const kid = wrapping(["sh", "-c", "printf seen; printf heard 1>&2"])
  expect(await new Response(kid.stdout).text()).toBe("seen")
  expect(await new Response(kid.stderr).text()).toBe("heard")
  expect(await kid.exited).toBe(0)
})

test("a term reaching the service reaches the binary, and the binary's own code comes back", async () => {
  const kid = wrapping(waiting("trap 'exit 42' TERM; "))
  await started(kid)
  kid.kill("SIGTERM")
  expect(await kid.exited).toBe(42)
})

test("an interrupt reaching the service reaches the binary", async () => {
  const kid = wrapping(waiting("trap 'exit 7' INT; "))
  await started(kid)
  kid.kill("SIGINT")
  expect(await kid.exited).toBe(7)
})

test("a binary a forwarded signal ended leaves the service on the code that signal makes", async () => {
  const kid = wrapping(waiting(""))
  await started(kid)
  kid.kill("SIGTERM")
  expect(await kid.exited).toBe(TERM_EXIT)
})

test("a call naming no binary is refused", async () => {
  const kid = wrapping([])
  expect(await kid.exited).toBe(REFUSED_EXIT)
  expect(await new Response(kid.stderr).text()).toContain("binary-running")
})
