import { afterAll, expect, test } from "bun:test"
import { mkdirSync, realpathSync, symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  homeExpanded,
  imageBytesAt,
  refusalFor,
  refusalIn,
  SCOPE,
} from "akasha/agent/hook/agent-hook/block-akasha-reads/block-akasha-reads.agent-hook.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { image } from "akasha/infrastructure/inference/generation/image/image.page-type.ts"
import { imageBytes } from "akasha/infrastructure/inference/generation/image/properties/image-bytes.file-property.ts"
import { INDEX_AT } from "akasha/page/index/modules/surface/index-surface.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function worldAt(): string {
  const root = realpathSync(scratch.rootFor("akasha-reads-hook-"))
  mkdirSync(join(root, "one"), { recursive: true })
  writeFileSync(join(root, "one", "held.ts"), "one\n")
  return root
}

function awayAt(): string {
  const away = realpathSync(scratch.rootFor("akasha-reads-away-"))
  writeFileSync(join(away, "held.ts"), "one\n")
  return away
}

test("a Read inside the checkout is refused and names the akasha read", () => {
  const root = worldAt()
  const said = refusalIn(join(root, "one", "held.ts"), root, root)
  expect(said).not.toBeNull()
  expect(said).toContain("akasha read --file-path one/held.ts")
  expect(said).toContain("inside this checkout")
})

test("a refusal says the output must reach the agent", () => {
  const root = worldAt()
  const said = refusalIn(join(root, "one", "held.ts"), root, root)
  expect(said).toContain("LET THE OUTPUT REACH YOU")
  expect(said).toContain("/dev/null")
})

test("a refusal says a body already held comes back as one line", () => {
  const root = worldAt()
  const said = refusalIn(join(root, "one", "held.ts"), root, root)
  expect(said).toContain("already hold")
  expect(said).toContain("--full")
})

test("a path is resolved against the directory the call was made in", () => {
  const root = worldAt()
  const said = refusalIn("held.ts", join(root, "one"), root)
  expect(said).toContain("akasha read --file-path one/held.ts")
})

test("a path spelled through a parent still lands inside", () => {
  const root = worldAt()
  const said = refusalIn(join(root, "one", "..", "one", "held.ts"), root, root)
  expect(said).not.toBeNull()
})

test("a Read outside the checkout is let through", () => {
  const root = worldAt()
  expect(refusalIn(join(awayAt(), "held.ts"), root, root)).toBeNull()
})

test("the index is no page, so a Read of it is let through", () => {
  const root = worldAt()
  mkdirSync(join(root, INDEX_AT), { recursive: true })
  writeFileSync(join(root, INDEX_AT, "one.jsonl"), "{}\n")
  expect(refusalIn(join(root, INDEX_AT, "one.jsonl"), root, root)).toBeNull()
})

test("a link inside the checkout pointing out of it is let through", () => {
  const root = worldAt()
  symlinkSync(join(awayAt(), "held.ts"), join(root, "pointer.ts"))
  expect(refusalIn(join(root, "pointer.ts"), root, root)).toBeNull()
})

test("a link outside the checkout pointing into it is refused", () => {
  const root = worldAt()
  const away = awayAt()
  symlinkSync(join(root, "one", "held.ts"), join(away, "pointer.ts"))
  expect(refusalIn(join(away, "pointer.ts"), root, root)).not.toBeNull()
})

test("a call naming no path is let through", () => {
  const root = worldAt()
  expect(refusalIn("", root, root)).toBeNull()
  expect(refusalIn("   ", root, root)).toBeNull()
})

test("another checkout of the repository is not guarded from here", () => {
  const one = worldAt()
  const other = worldAt()
  expect(refusalIn(join(other, "one", "held.ts"), other, one)).toBeNull()
})

test("a file that is not there yet is judged by where it would land", () => {
  const root = worldAt()
  expect(refusalIn(join(root, "one", "unborn.ts"), root, root)).not.toBeNull()
})

const PICTURE = "image-0123456789abcdef"

function pictureAt(root: string, name: string): string {
  mkdirSync(join(root, "pictures"), { recursive: true })
  writeFileSync(join(root, "pictures", name), "bytes\n")
  return join(root, "pictures", name)
}

test("an image's bytes are let through under each ending the image page type holds them in", () => {
  const root = worldAt()
  for (const ending of imageBytes.extensions) {
    const at = pictureAt(root, `${PICTURE}.image.${imageBytes.propertySlug}.uncommitted.${ending}`)
    expect(imageBytesAt(at)).toBe(true)
    expect(refusalIn(at, root, root)).toBeNull()
  }
})

test("the image page beside the bytes is refused", () => {
  const root = worldAt()
  expect(refusalIn(pictureAt(root, `${PICTURE}.image.ts`), root, root)).not.toBeNull()
  expect(refusalIn(pictureAt(root, `${PICTURE}.image.uncommitted.ts`), root, root)).not.toBeNull()
})

test("bytes under an ending the image page type does not hold are refused", () => {
  const root = worldAt()
  const at = pictureAt(root, `${PICTURE}.image.${imageBytes.propertySlug}.uncommitted.ts`)
  expect(refusalIn(at, root, root)).not.toBeNull()
})

test("a file named like bytes beside a page of another type is refused", () => {
  const root = worldAt()
  const at = pictureAt(root, `${PICTURE}.persona.${imageBytes.propertySlug}.uncommitted.jpg`)
  expect(refusalIn(at, root, root)).not.toBeNull()
})

test("a file beside an image under another property is refused", () => {
  const root = worldAt()
  const at = pictureAt(root, `${PICTURE}.image.other.uncommitted.jpg`)
  expect(refusalIn(at, root, root)).not.toBeNull()
})

test("a page spelled from the home folder is refused as its whole path is", () => {
  const root = worldAt()
  const home = join(root, "..")
  const under = root.slice(home.length + 1)
  const said = refusalIn(`~/${under}/one/held.ts`, "/", root, home)
  expect(said).toContain("akasha read --file-path one/held.ts")
})

test("an image's bytes spelled from the home folder are let through", () => {
  const root = worldAt()
  const home = join(root, "..")
  const under = root.slice(home.length + 1)
  const name = `${PICTURE}.image.${imageBytes.propertySlug}.uncommitted.jpg`
  pictureAt(root, name)
  expect(refusalIn(`~/${under}/pictures/${name}`, "/", root, home)).toBeNull()
})

test("the home folder alone is the home folder, and a `~` inside a name is left as it is", () => {
  expect(homeExpanded("~", "/home/one")).toBe("/home/one")
  expect(homeExpanded("~/a/b.ts", "/home/one")).toBe("/home/one/a/b.ts")
  expect(homeExpanded("a/~/b.ts", "/home/one")).toBe("a/~/b.ts")
  expect(homeExpanded("~other/b.ts", "/home/one")).toBe("~other/b.ts")
})

test("the image page type declares the bytes it lets through", () => {
  expect(image.properties.map((one) => one.pageProperty)).toContain(
    `file-property/${imageBytes.slug}`
  )
})

test("what this does not reach is printed, and names Glob and the index", () => {
  expect(SCOPE.join("\n")).toContain("NOT REACHED")
  expect(SCOPE.join("\n")).toContain("Glob")
  expect(SCOPE.join("\n")).toContain(INDEX_AT)
})

function called(tool: string, input: Record<string, unknown>, cwd: string) {
  return { tool_name: tool, tool_input: input, cwd }
}

function grepped(root: string, input: Record<string, unknown>): string | null {
  return refusalFor(called("Grep", { pattern: "needle", ...input }, root), root)
}

function ran(root: string, command: string, cwd: string = root): string | null {
  return refusalFor(called("Bash", { command }, cwd), root)
}

test("a Read handed as a payload is judged as a Read path is", () => {
  const root = worldAt()
  const said = refusalFor(called("Read", { file_path: "one/held.ts" }, root), root)
  expect(said).toContain("akasha read --file-path one/held.ts")
})

test("a Grep showing lines inside the checkout is refused and names the akasha search", () => {
  const root = worldAt()
  const said = grepped(root, { path: "one", output_mode: "content" })
  expect(said).toContain("akasha search --pattern 'needle' --within one")
  expect(grepped(root, { output_mode: "content" })).toContain("akasha search --pattern 'needle'")
})

test("a Grep over a folder holding the checkout searches the whole checkout", () => {
  const root = worldAt()
  const said = grepped(root, { path: join(root, ".."), output_mode: "content" })
  expect(said).toContain("akasha search --pattern 'needle'\n")
})

test("a pattern holding a quote is quoted so the shell hands it on whole", () => {
  const root = worldAt()
  const said = refusalFor(called("Grep", { pattern: "it's", output_mode: "content" }, root), root)
  expect(said).toContain("--pattern 'it'\\''s'")
})

test("a Grep showing only paths or counts, and a Glob, are let through", () => {
  const root = worldAt()
  expect(grepped(root, {})).toBeNull()
  expect(grepped(root, { output_mode: "files_with_matches" })).toBeNull()
  expect(grepped(root, { output_mode: "count" })).toBeNull()
  expect(refusalFor(called("Glob", { pattern: "**/*.ts" }, root), root)).toBeNull()
})

test("a Grep outside the checkout, and one over the index, are let through", () => {
  const root = worldAt()
  mkdirSync(join(root, INDEX_AT), { recursive: true })
  expect(grepped(root, { path: awayAt(), output_mode: "content" })).toBeNull()
  expect(grepped(root, { path: INDEX_AT, output_mode: "content" })).toBeNull()
})

test("a shell read inside the checkout is refused, naming the akasha read and search", () => {
  const root = worldAt()
  const said = ran(root, "cat one/held.ts")
  expect(said).toContain("akasha read --file-path one/held.ts")
  expect(said).toContain("akasha search --pattern")
  expect(ran(root, `head ${join(root, "one", "held.ts")}`, awayAt())).not.toBeNull()
})

test("a shell search inside the checkout is refused, naming the akasha search", () => {
  const root = worldAt()
  expect(ran(root, "rg needle one")).toContain("akasha search --pattern PATTERN --within one")
  expect(ran(root, "grep -rn needle .")).toContain("akasha search --pattern PATTERN\n")
  expect(ran(root, "git grep needle")).toContain("akasha search")
})

test("git showing a checkout file at HEAD or on disk is refused, naming the akasha read", () => {
  const root = worldAt()
  expect(ran(root, "git show HEAD:one/held.ts")).toContain("akasha read --file-path one/held.ts")
  expect(ran(root, "git diff")).toContain("git diff --stat")
})

test("paths, counts, git's state and history, reads outside, and akasha's own calls pass", () => {
  const root = worldAt()
  const away = awayAt()
  for (const said of [
    "rg -l needle",
    "grep -l needle one/held.ts",
    "git grep -l needle",
    "ls one",
    "wc -l one/held.ts",
    "git status",
    "git log",
    "git diff --stat",
    `cat ${join(away, "held.ts")}`,
    "cat /var/tmp/nothing-here.txt",
    "akasha read --file-path one/held.ts",
    "akasha search needle --within one",
  ]) {
    expect(ran(root, said)).toBeNull()
  }
})

test("every route a refusal names is itself let through", () => {
  const root = worldAt()
  const refusals = [
    ran(root, "cat one/held.ts"),
    ran(root, "rg needle one"),
    ran(root, "git diff"),
    grepped(root, { path: "one", output_mode: "content" }),
  ]
  for (const said of refusals) {
    const routes = (said ?? "").split("\n").filter((one) => one.startsWith("  akasha "))
    expect(routes.length).toBeGreaterThan(0)
    for (const one of routes) expect(ran(root, one.trim())).toBeNull()
  }
})
