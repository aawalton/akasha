import { expect, test } from "bun:test"
import {
  DATA,
  OK,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import {
  alanPicture,
  type Fetching,
  keptAt,
  pictureBrought,
  readIn,
} from "akasha/commands/pages/alan/picture/alan-picture.command.code.ts"

const CALLED_AS = "akasha alan picture"

const ID = "0199c2a4-2f3e-7000-8000-0123456789ab"

const JPEG = new Uint8Array([0xff, 0xd8, 0xff, 0xe0])

function storeHolding(keys: Readonly<Record<string, Uint8Array>>): Fetching {
  return {
    head: async (key) => {
      const held = keys[key]
      return held === undefined ? null : { size: held.byteLength }
    },
    get: async (key) => {
      const held = keys[key]
      if (held === undefined) throw new Error(`no object at ${key}`)
      return held
    },
  }
}

function writing() {
  const written: { at: string; bytes: Uint8Array }[] = []
  return {
    written,
    write: async (at: string, bytes: Uint8Array) => {
      written.push({ at, bytes })
    },
  }
}

test("nothing said is refused, naming what it takes", async () => {
  const said = await alanPicture([], {
    root: "/nowhere",
    calledAs: CALLED_AS,
    from: "/nowhere",
    writer: null,
    agentId: null,
  })
  expect(said.code).not.toBe(OK)
  expect(said.refusals[0]).toContain("--picture")
})

test("the picture's id is read off the first word or off the flag", () => {
  const word = readIn([ID], CALLED_AS)
  expect(!("refused" in word) && word.picture).toBe(ID)
  const flagged = readIn(["--picture", ID, "--output", "/somewhere/a.jpg"], CALLED_AS)
  expect(!("refused" in flagged) && flagged.output).toBe("/somewhere/a.jpg")
})

test("an id spelled in capitals is read in lower case", () => {
  const said = readIn([ID.toUpperCase()], CALLED_AS)
  expect(!("refused" in said) && said.picture).toBe(ID)
})

test("a word that is no uuid is refused", () => {
  const said = readIn(["yesterday"], CALLED_AS)
  expect("refused" in said && said.refused[0]).toContain("uuid")
})

test("the file is written under the home folder, named for the id and the image kept", () => {
  const at = keptAt({ picture: ID, output: undefined }, `images/${ID}.jpg`)
  expect(at.endsWith(`/.local/share/akasha/pictures/${ID}.jpg`)).toBe(true)
  expect(keptAt({ picture: ID, output: undefined }, `images/${ID}.png`).endsWith(".png")).toBe(true)
  expect(keptAt({ picture: ID, output: "/somewhere/a.jpg" }, `images/${ID}.jpg`)).toBe(
    "/somewhere/a.jpg"
  )
})

test("no object store is refused before anything is written", async () => {
  const { write, written } = writing()
  const said = await pictureBrought({ picture: ID, output: undefined }, null, write)
  expect(said.code).toBe(OPERATIONAL)
  expect(written).toEqual([])
})

test("an id nothing is kept under is missing data", async () => {
  const { write, written } = writing()
  const said = await pictureBrought({ picture: ID, output: undefined }, storeHolding({}), write)
  expect(said.code).toBe(DATA)
  expect(said.refusals[0]).toContain(ID)
  expect(written).toEqual([])
})

test("a jpeg kept under the id is written out and its path is answered", async () => {
  const { write, written } = writing()
  const said = await pictureBrought(
    { picture: ID, output: undefined },
    storeHolding({ [`images/${ID}.jpg`]: JPEG }),
    write
  )
  expect(said.code).toBe(OK)
  expect(written).toHaveLength(1)
  expect(written[0]?.at.endsWith(`${ID}.jpg`)).toBe(true)
  expect(Array.from(written[0]?.bytes ?? [])).toEqual(Array.from(JPEG))
  expect(said.report).toEqual([`picture\t${ID}`, `path\t${written[0]?.at}`, "bytes\t4"])
})

test("a png kept under the id is written as a png", async () => {
  const { write, written } = writing()
  await pictureBrought(
    { picture: ID, output: undefined },
    storeHolding({ [`images/${ID}.png`]: JPEG }),
    write
  )
  expect(written[0]?.at.endsWith(`${ID}.png`)).toBe(true)
})
