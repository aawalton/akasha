import { describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { derivePopoverFamilyTags, tagsFromPrimitiveSources } from "./popover-family-wrappers.ts"

const SCRATCH_PREFIX = "/var/tmp/popover-family-wrappers-"

function wrapper(args: {
  readonly tag: string
  readonly cap: string
  readonly collisionPadding?: boolean
  readonly exported?: boolean
}): string {
  const padding = args.collisionPadding === false ? "" : "collisionPadding={collisionPadding}"
  const body = `function ${args.tag}({ className, collisionPadding = 8, ...props }: Props) {
  return (
    <Primitive.Content
      ${padding}
      className={cn("z-50 ${args.cap} rounded-md p-3", className)}
      {...props}
    />
  )
}
`
  return args.exported === false ? body : `${body}\nexport { ${args.tag} }\n`
}

function tagsOf(source: string): ReadonlyMap<string, string> {
  return tagsFromPrimitiveSources([{ path: "probe.tsx", source }])
}

function withScratchTree(use: (root: string) => undefined): undefined {
  const root = mkdtempSync(SCRATCH_PREFIX)
  try {
    use(root)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
  return undefined
}

function writePrimitivesManifest(root: string, name: string): string {
  const dir = resolve(root, "packages/shared/design/primitives")
  mkdirSync(resolve(dir, "src/components"), { recursive: true })
  writeFileSync(resolve(dir, "package.json"), `{ "name": "${name}" }\n`)
  return dir
}

describe("tagsFromPrimitiveSources", () => {
  test("admits a wrapper that exists in no tree, on the strength of what it spells", () => {
    const derived = tagsOf(
      wrapper({ tag: "TooltipContent", cap: "max-w-(--radix-tooltip-content-available-width)" })
    )
    expect([...derived]).toEqual([["TooltipContent", "tooltip"]])
  })

  test("reads both spellings of the cap the wrappers are split between", () => {
    const bracket = tagsOf(
      wrapper({
        tag: "PopoverContent",
        cap: "max-w-[var(--radix-popover-content-available-width)]",
      })
    )
    const shorthand = tagsOf(
      wrapper({ tag: "MenubarContent", cap: "max-w-(--radix-menubar-content-available-width)" })
    )
    expect(bracket.get("PopoverContent")).toBe("popover")
    expect(shorthand.get("MenubarContent")).toBe("menubar")
  })

  test("a sub-content wrapper spelling neither half joins nothing", () => {
    const derived = tagsOf(
      wrapper({ tag: "DropdownMenuSubContent", cap: "min-w-32", collisionPadding: false })
    )
    expect([...derived]).toEqual([])
  })

  test("a cap without a collision padding is not the contract", () => {
    const derived = tagsOf(
      wrapper({
        tag: "HalfContent",
        cap: "max-w-[var(--radix-popover-content-available-width)]",
        collisionPadding: false,
      })
    )
    expect([...derived]).toEqual([])
  })

  test("a collision padding without a cap is not the contract", () => {
    expect([...tagsOf(wrapper({ tag: "OtherContent", cap: "max-w-md" }))]).toEqual([])
  })

  test("an unexported wrapper joins nothing", () => {
    const derived = tagsOf(
      wrapper({
        tag: "HiddenContent",
        cap: "max-w-(--radix-popover-content-available-width)",
        exported: false,
      })
    )
    expect([...derived]).toEqual([])
  })

  test("one tag claiming two families throws rather than picking one", () => {
    expect(() =>
      tagsFromPrimitiveSources([
        {
          path: "a.tsx",
          source: wrapper({
            tag: "PopoverContent",
            cap: "max-w-(--radix-popover-content-available-width)",
          }),
        },
        {
          path: "b.tsx",
          source: wrapper({
            tag: "PopoverContent",
            cap: "max-w-(--radix-select-content-available-width)",
          }),
        },
      ])
    ).toThrow(/cannot name both/)
  })
})

describe("derivePopoverFamilyTags", () => {
  test("the components directory is read, so a wrapper file joins by landing in it", () => {
    withScratchTree((root) => {
      const dir = writePrimitivesManifest(root, "@shared/design-primitives")
      writeFileSync(
        resolve(dir, "src/components/tooltip.tsx"),
        wrapper({ tag: "TooltipContent", cap: "max-w-(--radix-tooltip-content-available-width)" })
      )
      expect([...derivePopoverFamilyTags(root)]).toEqual([["TooltipContent", "tooltip"]])
      return undefined
    })
  })

  test("a tree with no primitives package throws rather than governing nothing", () => {
    withScratchTree((root) => {
      expect(() => derivePopoverFamilyTags(root)).toThrow(/no package manifest at/)
      return undefined
    })
  })

  test("a package that has moved out from under the path throws by name", () => {
    withScratchTree((root) => {
      writePrimitivesManifest(root, "@shared/something-else")
      expect(() => derivePopoverFamilyTags(root)).toThrow(
        /rather than "@shared\/design-primitives"/
      )
      return undefined
    })
  })

  test("a primitives package whose components declare no contract throws", () => {
    withScratchTree((root) => {
      const dir = writePrimitivesManifest(root, "@shared/design-primitives")
      writeFileSync(
        resolve(dir, "src/components/button.tsx"),
        wrapper({ tag: "Button", cap: "max-w-md" })
      )
      expect(() => derivePopoverFamilyTags(root)).toThrow(/would govern no tag at all/)
      return undefined
    })
  })
})
