import { expect, test } from "bun:test"
import {
  DATA,
  OK,
  OPERATIONAL,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import {
  alanPicture,
  type Bringing,
  keptAt,
  pictureBrought,
  readIn,
} from "akasha/command/pages/alan/picture/alan-picture.command.code.ts"
import type { Fetched } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const CALLED_AS = "akasha alan picture"

const ID = "image-0123456789abcdef"

const JPEG = new Uint8Array([0xff, 0xd8, 0xff, 0xe0])

const PNG = new Uint8Array([0x89, 0x50, 0x4e, 0x47])

function pagesHolding(slugs: Readonly<Record<string, Uint8Array<ArrayBuffer>>>): Bringing {
  return async (slug): Promise<Fetched> => {
    const held = slugs[slug]
    if (held === undefined) return { refused: `\`image/${slug}\` is no page here` }
    return { bytes: held }
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

test("the image's slug is read off the first word or off the flag", () => {
  const word = readIn([ID], CALLED_AS)
  expect(!("refused" in word) && word.picture).toBe(ID)
  const flagged = readIn(["--picture", ID, "--output", "/somewhere/a.jpg"], CALLED_AS)
  expect(!("refused" in flagged) && flagged.output).toBe("/somewhere/a.jpg")
})

test("a slug spelled in capitals is read in lower case", () => {
  const said = readIn([ID.toUpperCase()], CALLED_AS)
  expect(!("refused" in said) && said.picture).toBe(ID)
})

test("a word that is no image slug is refused", () => {
  const said = readIn(["yesterday"], CALLED_AS)
  expect("refused" in said && said.refused[0]).toContain("image-")
})

test("the file is written under the home folder, named for the slug and the ending", () => {
  const at = keptAt({ picture: ID, output: undefined }, "jpg")
  expect(at.endsWith(`/.local/share/akasha/pictures/${ID}.jpg`)).toBe(true)
  expect(keptAt({ picture: ID, output: undefined }, "png").endsWith(".png")).toBe(true)
  expect(keptAt({ picture: ID, output: "/somewhere/a.jpg" }, "jpg")).toBe("/somewhere/a.jpg")
})

test("a slug no image page holds is missing data", async () => {
  const { write, written } = writing()
  const said = await pictureBrought({ picture: ID, output: undefined }, pagesHolding({}), write)
  expect(said.code).toBe(DATA)
  expect(said.refusals[0]).toContain(ID)
  expect(written).toEqual([])
})

test("pages that could not be reached are refused as an operational fault", async () => {
  const { write, written } = writing()
  const said = await pictureBrought(
    { picture: ID, output: undefined },
    async () => ({ refused: "nothing came back — 6 attempts reached the pages" }),
    write
  )
  expect(said.code).toBe(OPERATIONAL)
  expect(written).toEqual([])
})

test("a jpeg held under the slug is written out and its path is answered", async () => {
  const { write, written } = writing()
  const said = await pictureBrought(
    { picture: ID, output: undefined },
    pagesHolding({ [ID]: JPEG }),
    write
  )
  expect(said.code).toBe(OK)
  expect(written).toHaveLength(1)
  expect(written[0]?.at.endsWith(`${ID}.jpg`)).toBe(true)
  expect(Array.from(written[0]?.bytes ?? [])).toEqual(Array.from(JPEG))
  expect(said.report).toEqual([`picture\t${ID}`, `path\t${written[0]?.at}`, "bytes\t4"])
})

test("a png held under the slug is written as a png", async () => {
  const { write, written } = writing()
  await pictureBrought({ picture: ID, output: undefined }, pagesHolding({ [ID]: PNG }), write)
  expect(written[0]?.at.endsWith(`${ID}.png`)).toBe(true)
})
