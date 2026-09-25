import { expect, test } from "bun:test"
import {
  formatSeatProcKey,
  readSeatProcKey,
} from "akasha/agent/seat/observation/modules/seat-proc-key/seat-proc-key.module.code.ts"
import {
  decideWindow,
  procKeyOfWindowSlug,
  removalFor,
  sweepWindowPages,
  windowsIn,
} from "akasha/alan/harness/code-editor/window/modules/window-page-sweeping/window-page-sweeping.module.code.ts"
import { readProcess } from "akasha/code/editor/extension/modules/window-identity/window-identity.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

function keyOfPid(pid: number): string {
  const key = readSeatProcKey(pid)
  if (key === null) throw new Error(`${pid} states no start tick, so this test cannot run`)
  return formatSeatProcKey(key)
}

function slugFor(procKey: string): string {
  return `window-${procKey}`
}

test("a window's slug carries the very key a seat's process key is written as", async () => {
  const mine = process.pid
  expect(await readProcess(mine)).toBe(keyOfPid(mine))
})

test("the key read back out of a window's slug is the key the editor put in", async () => {
  const minted = await readProcess(process.pid)
  expect(procKeyOfWindowSlug(slugFor(minted))).toBe(minted)
})

test("a window whose process is there is kept", () => {
  expect(decideWindow(keyOfPid(process.pid))).toBe("keep")
})

test("a window whose process has ended is swept", async () => {
  const child = Bun.spawn(["sleep", "300"])
  const stated = keyOfPid(child.pid)
  expect(decideWindow(stated)).toBe("keep")
  child.kill("SIGKILL")
  await child.exited
  expect(decideWindow(stated)).toBe("sweep")
})

test("a pid come round again under another start tick is another window", () => {
  const key = readSeatProcKey(process.pid)
  if (key === null) throw new Error("this process states no start tick, so this test cannot run")
  expect(decideWindow(`${key.pid}-${key.startTicks}`)).toBe("keep")
  expect(decideWindow(`${key.pid}-${key.startTicks + 1}`)).toBe("sweep")
})

test("a slug that states no process key is read as none rather than guessed at", () => {
  expect(procKeyOfWindowSlug("code-editor-window")).toBe(null)
  expect(procKeyOfWindowSlug("window-")).toBe(null)
  expect(procKeyOfWindowSlug("window-alan")).toBe(null)
  expect(procKeyOfWindowSlug("window-1-2-3")).toBe(null)
  expect(procKeyOfWindowSlug("window-0-0")).toBe(null)
})

test("a window whose start tick the editor could not read states no process key", () => {
  expect(procKeyOfWindowSlug(`window-${process.pid}-0`)).toBe(null)
})

test("every window the index answers states the key its slug carries", () => {
  const read = windowsIn(rootFor(resolveRoots(), AKASHA))
  for (const one of read.windows) expect(procKeyOfWindowSlug(one.slug)).toBe(one.procKey)
  for (const one of read.unjudged) expect(procKeyOfWindowSlug(one)).toBe(null)
})

test("a removal states the commit the checkout was at before its windows were read", () => {
  const read = "f".repeat(40)
  const page = "alan/harness/code-editor/window/pages/window-1-2/window-1-2.code-editor-window.ts"
  const asked = removalFor([page], read)
  expect(asked.removes).toEqual([page])
  expect(asked.read).toBe(read)
})

test("a sweep that is not asked to remove takes nothing away and ends well", async () => {
  expect(await sweepWindowPages([])).toBe(0)
})
