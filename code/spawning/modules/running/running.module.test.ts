import { expect, test } from "bun:test"
import {
  chmodSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { join } from "node:path"
import {
  bytes,
  delegatedAt,
  grouped,
  heldHere,
  madePid,
  NO_CODE,
  ownAt,
  ran,
  said,
} from "akasha/code/spawning/modules/running/running.module.code.ts"
import {
  NO_QUOTA,
  NOTHING,
  quotaAbove,
  quotaSeen,
} from "akasha/code/spawning/modules/running/running.module.test-fixtures.ts"

const CODE = `${import.meta.dir}/running.module.code.ts`

const MEASURED = { metered: true }

test("a command exiting zero is answered as zero and what it printed", () => {
  expect(ran(["sh", "-c", "printf hello"])).toMatchObject({
    code: 0,
    signal: null,
    out: "hello",
    err: "",
  })
})

test("a command exiting other than zero is answered rather than thrown", () => {
  expect(ran(["false"])).toMatchObject({ code: 1, signal: null, out: "", err: "" })
})

test("what a command says on each stream is kept apart", () => {
  expect(ran(["sh", "-c", "printf out; printf err 1>&2; exit 3"])).toMatchObject({
    code: 3,
    signal: null,
    out: "out",
    err: "err",
  })
})

test("a process ending on a signal is answered as that signal beside no code of its own", () => {
  const done = ran(["sh", "-c", "kill -SEGV $$"])
  expect(done.code).toBe(NO_CODE)
  expect(done.signal).toBe("SIGSEGV")
})

test("processes dying on different signals are told apart rather than collapsed", () => {
  expect(ran(["sh", "-c", "kill -KILL $$"]).signal).toBe("SIGKILL")
  expect(ran(["sh", "-c", "kill -ABRT $$"]).signal).toBe("SIGABRT")
})

test("a process exiting a code of its own names no signal", () => {
  expect(ran(["false"]).signal).toBeNull()
})

test("bytes carries the signal the process died on as text does", () => {
  expect(bytes(["sh", "-c", "kill -KILL $$"]).signal).toBe("SIGKILL")
})

test("what a process said is a throw naming the signal where a signal ended it", () => {
  expect(() => said(["sh", "-c", "kill -KILL $$"])).toThrow(/`sh` died on SIGKILL/)
})

test("what a process said comes back where it exited zero", () => {
  expect(said(["sh", "-c", "printf hello"])).toBe("hello")
})

test("what a process said is a throw naming the command and the code and the error stream", () => {
  expect(() => said(["sh", "-c", "printf nope 1>&2; exit 7"])).toThrow(/`sh` exited 7 — nope/)
})

test("a process runs where the caller says", () => {
  expect(ran(["pwd"], { cwd: "/usr" }).out).toBe("/usr\n")
})

test("a process is given the environment the caller states", () => {
  expect(
    ran(["printenv", "AKASHA_RUNNING_PROBE"], { env: { AKASHA_RUNNING_PROBE: "here" } })
  ).toMatchObject({ code: 0, signal: null, out: "here\n", err: "" })
})

test("a process is answered with the processor seconds that process and its own children spent", () => {
  const idle = ran(["true"]).cpuSeconds
  const busy = ran(["bun", "-e", "let x = 0; for (let i = 0; i < 3e7; i++) x += i"]).cpuSeconds
  expect(idle).toBeLessThan(busy)
})

test("a process asked to be measured is answered with the peak memory that process reached", () => {
  const small = ran(["bun", "-e", ""], MEASURED).peakBytes
  const large = ran(["bun", "-e", "new Uint8Array(80e6).fill(1)"], MEASURED).peakBytes
  expect(small).toBeGreaterThan(0)
  expect(large - small).toBeGreaterThan(60e6)
})

test("a process run after a bigger one is answered its own peak rather than the bigger one", () => {
  const large = ran(["bun", "-e", "new Uint8Array(80e6).fill(1)"], MEASURED).peakBytes
  const small = ran(["true"], MEASURED).peakBytes
  expect(large).toBeGreaterThan(60e6)
  expect(small).toBeLessThan(large / 4)
})

test("a caller is answered whether the peak answered was measured", () => {
  expect(ran(["true"], MEASURED).peakMeasured).toBe(true)
  expect(bytes(["true"], MEASURED).peakMeasured).toBe(true)
})

test("a process nobody asked to measure is answered as having reached no peak", () => {
  expect(bytes(["true"]).peakBytes).toBe(0)
  expect(bytes(["true"]).peakMeasured).toBe(false)
})

test("a ceiling asks for the group a measure asks for", () => {
  expect(grouped({})).toBe(false)
  expect(grouped({ metered: true })).toBe(true)
  expect(grouped({ cpuCeiling: 1 })).toBe(true)
  expect(grouped({ memoryCeiling: 1 })).toBe(true)
})

test("a program no path names raises rather than being answered", () => {
  expect(() => bytes(["no-such-program-on-any-path"])).toThrow(/no-such-program/)
})

test("a program is looked for on the path the run itself will have", () => {
  const at = mkdtempSync("/var/tmp/akasha-running-path-")
  const shadowing = join(at, "id")
  writeFileSync(shadowing, "#!/bin/sh\necho shadowed\n")
  chmodSync(shadowing, 0o755)
  try {
    const done = ran(["id"], {
      env: { ...process.env, PATH: `${at}:${String(process.env.PATH)}` },
      metered: true,
    })
    expect(done.out).toBe("shadowed\n")
  } finally {
    rmSync(at, { recursive: true, force: true })
  }
})

test("the run that made a group is named in the group's name", () => {
  expect(madePid("akasha-1234-5678")).toBe(1234)
  expect(madePid("akasha-call-1234")).toBeNull()
  expect(madePid("akasha-1234")).toBeNull()
  expect(madePid("agent")).toBeNull()
})

test("a group left where the run that made it is gone is taken away before a group is made", () => {
  const own = (readFileSync("/proc/self/cgroup", "utf8").trim().split(":").at(-1) ?? "").trim()
  const parent = delegatedAt(own)
  expect(parent).not.toBeNull()
  const gone = ran(["sh", "-c", "printf %s $$"]).out
  const left = join(String(parent), `akasha-${gone}-1`)
  mkdirSync(left)
  expect(existsSync(left)).toBe(true)
  ran(["true"], MEASURED)
  expect(existsSync(left)).toBe(false)
})

test("a group left is emptied and taken away with every group inside it", async () => {
  const maker = Bun.spawn(["sleep", "30"])
  const left = join(String(delegatedAt(String(ownAt()))), `akasha-${String(maker.pid)}-1`)
  const inside = join(left, "akasha-call-3", "run")
  mkdirSync(inside, { recursive: true })
  const lingering = Bun.spawn(["sh", "-c", `echo $$ > ${inside}/cgroup.procs; exec sleep 30`])
  for (let held = 0; held < 100; held += 1) {
    if (readFileSync(`${inside}/cgroup.procs`, "utf8").trim() !== "") break
    Bun.sleepSync(10)
  }
  maker.kill()
  await maker.exited
  ran(["true"], MEASURED)
  await lingering.exited
  expect(lingering.signalCode).toBe("SIGKILL")
  expect(existsSync(left)).toBe(false)
})

test("a group that cannot be taken away once its run is over is said aloud", () => {
  const inner = `import { bytes } from ${JSON.stringify(CODE)}; `
  const run = 'bytes(["sh", "-c", "sleep 2 >/dev/null 2>&1 &"], { metered: true })'
  expect(ran(["bun", "-e", inner + run]).err).toMatch(/a group was left at .* 1 processes/)
})

test("a process given a ceiling is ended at twice that many processor seconds", () => {
  const done = ran(["sh", "-c", "while :; do :; done"], { cpuCeiling: 0.3 })
  expect(done.signal).toBe("SIGKILL")
  expect(done.cpuSeconds).toBeGreaterThan(0.5)
  expect(done.cpuSeconds).toBeLessThan(1.2)
})

test("a run over its stated ceiling and under twice it runs to its own end", () => {
  const spinning = "const at = Date.now(); while (Date.now() - at < 500) {}"
  const done = ran(["bun", "-e", spinning], { cpuCeiling: 0.4 })
  expect(done.signal).toBeNull()
  expect(done.code).toBe(0)
  expect(done.cpuSeconds).toBeGreaterThan(0.4)
})

test("a process given no ceiling runs to its own end", () => {
  expect(ran(["true"]).signal).toBeNull()
})

const WEIGHING = "/sys/fs/cgroup$(cut -d: -f3 /proc/self/cgroup)/.."

test("a process is given the memory ceiling its caller stated", () => {
  const held = ran(["sh", "-c", `cat ${WEIGHING}/memory.high`], { memoryCeiling: 128 })
  expect(held.out.trim()).toBe("134217728")
})

test("a process given no memory ceiling is held to none", () => {
  expect(ran(["sh", "-c", `cat ${WEIGHING}/memory.high`], MEASURED).out.trim()).toBe("max")
})

const TIGHT = "200000 50000"

const WIDE = "800000 100000"

test("the group made for a run states the processor quota that group is already held to", () => {
  expect(quotaSeen([TIGHT])).toBe(TIGHT)
})

test("a group above the run stating no quota is read past to the quota in force", () => {
  expect(quotaSeen([TIGHT, NOTHING])).toBe(TIGHT)
})

test("the quota stated is the tightest in force rather than the nearest one stated", () => {
  expect(quotaSeen([TIGHT, WIDE])).toBe(TIGHT)
})

test("a run no group above holds to a quota states none rather than one made up", () => {
  expect(quotaSeen([NOTHING, NOTHING])).toBe(quotaAbove() ?? NO_QUOTA)
})

test("a process inside one given a ceiling states a ceiling above its own", () => {
  const inner =
    `import { ran } from ${JSON.stringify(CODE)}; ` +
    'const done = ran(["true"], { cpuCeiling: 300 }); console.log(done.code, done.signal)'
  expect(ran(["bun", "-e", inner], { cpuCeiling: 30 }).out.trim()).toBe("0 null")
})

test("a ceiling bounds a process and everything that process starts, together", () => {
  const inner = 'Bun.spawnSync(["sh", "-c", "while :; do :; done"])'
  const done = ran(["bun", "-e", inner], { cpuCeiling: 0.3 })
  expect(done.signal).toBe("SIGKILL")
  expect(done.cpuSeconds).toBeLessThan(2)
})

test("a delegated ancestor is the one a budget is made under", () => {
  expect(delegatedAt("/nowhere/akasha-probe")).toBeNull()
  const own = (readFileSync("/proc/self/cgroup", "utf8").trim().split(":").at(-1) ?? "").trim()
  const at = delegatedAt(own)
  expect(at).not.toBeNull()
  const control = readFileSync(`${String(at)}/cgroup.subtree_control`, "utf8")
  expect(control).toContain("cpu")
  expect(control).toContain("memory")
})

test("the seconds answered carry what a process's own children spent", () => {
  const inner = "Bun.spawnSync(['bun', '-e', 'let x = 0; for (let i = 0; i < 1e8; i++) x += i'])"
  expect(ran(["bun", "-e", inner]).cpuSeconds).toBeGreaterThan(0.1)
})

test("what a run held carries what a run started inside it held", () => {
  const inner =
    `import { ran } from ${JSON.stringify(CODE)}; ` +
    'ran(["bun", "-e", "new Uint8Array(80e6).fill(1)"])'
  expect(ran(["bun", "-e", inner], MEASURED).peakBytes).toBeGreaterThan(60e6)
})

test("the seconds answered carry a child the run never reaped, bounded or not", () => {
  const inner =
    "const child = Bun.spawn(['bun', '-e', 'let x = 0; for (let i = 0; i < 3e8; i++) x += i'])\n" +
    "child.unref()\n" +
    "Bun.sleepSync(1200)\n"
  expect(ran(["bun", "-e", inner], MEASURED).cpuSeconds).toBeGreaterThan(0.2)
  expect(ran(["bun", "-e", inner], { cpuCeiling: 30 }).cpuSeconds).toBeGreaterThan(0.2)
})

test("what a caller hands in reaches the process", () => {
  expect(ran(["cat"], { stdin: new TextEncoder().encode("handed in") }).out).toBe("handed in")
})

test("an environment a caller widens carries what it was widened from", () => {
  expect(
    ran(["printenv", "AKASHA_RUNNING_PROBE"], {
      env: { ...process.env, AKASHA_RUNNING_PROBE: "here" },
    }).out
  ).toBe("here\n")
})

test("what a process says on its output stream comes back as the bytes it wrote", () => {
  const done = bytes(["printf", "hi"])
  expect(done.code).toBe(0)
  expect([...done.out]).toEqual([104, 105])
})

test("bytes a reader could not read as text come back whole", () => {
  const done = bytes(["printf", "\\377\\376"])
  expect([...done.out]).toEqual([255, 254])
})

const ROOM = 4096

test("a process held here sits in a leaf of the group made for that hold", () => {
  const before = ownAt()
  const letting = heldHere(ROOM)
  const inside = String(ownAt())
  letting()

  expect(inside.endsWith("/run")).toBe(true)
  expect(madePid(inside.split("/").at(-2) ?? "")).toBe(process.pid)
  expect(ownAt()).toBe(before)
})

test("the memory ceiling of a hold is stated on the leaf the process is held in", () => {
  const letting = heldHere(ROOM)
  const leaf = `/sys/fs/cgroup${String(ownAt())}`
  const high = readFileSync(join(leaf, "memory.high"), "utf8").trim()
  letting()

  expect(high).toBe(String(ROOM * 1048576))
})

test("letting go takes away the group the hold made", () => {
  const letting = heldHere(ROOM)
  const leaf = `/sys/fs/cgroup${String(ownAt())}`
  letting()

  expect(existsSync(leaf)).toBe(false)
  expect(existsSync(join(leaf, ".."))).toBe(false)
})
