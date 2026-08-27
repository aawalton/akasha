import { expect, test } from "bun:test"
import { readdirSync, readFileSync } from "node:fs"
import { basename, join } from "node:path"
import { optionalEnv } from "@shared/utils-narrow/require-env"
import { z } from "zod"
import { mintSongSlug, slugifyName } from "./song-slug"

const CATALOGUE = join(
  optionalEnv("MEMORY_ROOT") ?? join(optionalEnv("HOME") ?? "", "repos/memory"),
  "music/catalogue"
)

const VALUE_CAPTURE = z.tuple([z.string(), z.string()])

interface Song {
  readonly stem: string
  readonly title: string
  readonly artistSlug: string
  readonly seq: number
}

function frontmatterValue(frontmatter: string, key: string): string | null {
  const captured = VALUE_CAPTURE.safeParse(frontmatter.match(new RegExp(`^${key}: (.*)$`, "m")))
  if (!captured.success) return null
  return captured.data[1].trim().replace(/^"(.*)"$/, "$1")
}

function readCatalogue(): readonly Song[] {
  const stems = readdirSync(CATALOGUE).filter(
    (one) => one.endsWith(".md") && !one.endsWith(".large.md")
  )
  return stems.map((one) => {
    const frontmatter = readFileSync(join(CATALOGUE, one), "utf8").split("---")[1] ?? ""
    return {
      stem: basename(one, ".md"),
      title: frontmatterValue(frontmatter, "title") ?? "",
      artistSlug: frontmatterValue(frontmatter, "artist-slug") ?? "",
      seq: Number(frontmatterValue(frontmatter, "seq") ?? 0),
    }
  })
}

test("every song on disk carries the slug its own filename spells", () => {
  const songs = readCatalogue()
  expect(songs.length).toBeGreaterThan(0)
  for (const song of songs) {
    expect(song.artistSlug).not.toBe("")
    expect(song.title).not.toBe("")
  }
})

test("minting in seq order reproduces every filename in the catalogue", () => {
  const songs = [...readCatalogue()].sort((a, b) => a.seq - b.seq)
  const taken = new Set<string>()
  const wrong: string[] = []
  for (const song of songs) {
    const minted = mintSongSlug(song.artistSlug, song.title, taken)
    taken.add(minted)
    if (minted !== song.stem) wrong.push(`${song.stem} was minted as ${minted}`)
  }
  expect(wrong).toEqual([])
  expect(taken.size).toBe(songs.length)
})

test("the shared page-href slugifier is not this rule, because it drops a diacritic", () => {
  const pageHrefWould = "Déjà Vu"
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
  expect(pageHrefWould).toBe("d-j-vu")
  expect(slugifyName("Déjà Vu")).toBe("deja-vu")
})
