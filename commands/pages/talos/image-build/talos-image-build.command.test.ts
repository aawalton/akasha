import { expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  answering,
  OPERATIONAL,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type {
  Registering,
  Writing,
} from "akasha/commands/pages/talos/image-build/talos-image-build.command.code.ts"
import {
  isoSaid,
  registeredSchematic,
  schematicSaid,
  wroteIso,
} from "akasha/commands/pages/talos/image-build/talos-image-build.command.code.ts"

const YAML = "customization: {}\n"

const ID = "a1b2c3"

const AT = "/nowhere/installer.iso"

const BYTES = new Uint8Array([1, 2, 3])

const registering: Registering = async () => ID

const refusing: Registering = async () => {
  throw new OperationalError("the image factory would not take the schematic")
}

const writing: Writing = async () => undefined

const failing: Writing = async () => {
  throw new OperationalError("the file would not open")
}

test("the schematic is named as soon as the factory holds it", async () => {
  const done: string[] = []

  await registeredSchematic(YAML, registering, done)
  expect(done).toEqual([schematicSaid(ID)])
})

test("the download is named as soon as the bytes reach the disk", async () => {
  const done: string[] = []

  await wroteIso(AT, BYTES, writing, done)
  expect(done).toEqual([isoSaid(AT)])
})

test("a build that threw part way names in its refusal the schematic it had registered", async () => {
  const held = await answering(async (done) => {
    await registeredSchematic(YAML, registering, done)
    await wroteIso(AT, BYTES, failing, done)
    return told(done)
  })

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toEqual([schematicSaid(ID)])
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain(ID)
  expect(last).not.toContain(AT)
})

test("a build that threw before the factory took the schematic names nothing", async () => {
  const held = await answering(async (done) => {
    await registeredSchematic(YAML, refusing, done)
    return told(done)
  })

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})
