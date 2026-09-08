import {
  type NamedRoot,
  relativizeToNamedRoot,
} from "../image-locator/image-locator.module.code.ts"
import { toPersonaSlug } from "../image-name/image-name.module.code.ts"

const IMAGE_EXTENSIONS: readonly string[] = ["png", "jpg", "jpeg", "webp"]

const GRADES: readonly string[] = [
  "S+",
  "S",
  "S-",
  "A+",
  "A",
  "A-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "C-",
  "D",
  "F",
]

const PERSONA_IMAGE_BUCKETS: Readonly<Record<string, string>> = {
  canon: "canon",
  finalists: "finalist",
  lora: "lora-source",
}

export const CANONICAL_BACKFILL_TAG = "canonical-backfill"

export interface CanonicalImageClass {
  readonly bucket: "personas" | "explore" | "generated"
  readonly category: string
  readonly persona?: string
  readonly grade?: string
  readonly tags: readonly string[]
  readonly title: string
  readonly imageRoot: string
  readonly relative: string
}

const GENERATED_DIR_SUFFIXES: readonly string[] = [
  "-wallpaper-compose",
  "-wp-compose",
  "-wallpaper",
  "-concepts",
  "-prayer",
  "-voice",
]

function basename(path: string): string {
  const parts = path.split("/")
  return parts[parts.length - 1] ?? path
}

function extensionOf(name: string): string {
  const dot = name.lastIndexOf(".")
  return dot < 0 ? "" : name.slice(dot + 1).toLowerCase()
}

function isImageName(name: string): boolean {
  return IMAGE_EXTENSIONS.includes(extensionOf(name))
}

function gradeFromFilename(name: string): string | undefined {
  const dot = name.lastIndexOf(".")
  const stem = dot < 0 ? name : name.slice(0, dot)
  const dash = stem.lastIndexOf("-")
  if (dash < 0) return undefined
  const tail = stem.slice(dash + 1).toUpperCase()
  return GRADES.includes(tail) ? tail : undefined
}

function finish(input: {
  readonly bucket: "personas" | "explore" | "generated"
  readonly category: string
  readonly persona?: string
  readonly grade?: string
  readonly extraTags: readonly string[]
  readonly imageRoot: string
  readonly relative: string
}): CanonicalImageClass {
  const tags = [
    CANONICAL_BACKFILL_TAG,
    input.bucket,
    input.category,
    ...(input.persona !== undefined ? [`persona:${input.persona}`] : []),
    ...(input.grade !== undefined ? [`grade:${input.grade}`] : []),
    ...input.extraTags,
  ]
  const label = [input.persona, input.category, input.grade]
    .filter((p) => p !== undefined)
    .join(" ")
  const title = `${label} — ${basename(input.relative)}`
  return {
    bucket: input.bucket,
    category: input.category,
    ...(input.persona !== undefined ? { persona: input.persona } : {}),
    ...(input.grade !== undefined ? { grade: input.grade } : {}),
    tags,
    title,
    imageRoot: input.imageRoot,
    relative: input.relative,
  }
}

function classifyPersonas(relative: string): CanonicalImageClass | null {
  const segs = relative.split("/")
  const slugDir = segs[0]
  if (slugDir === undefined || segs.length < 2) return null
  const persona = toPersonaSlug(slugDir)

  if (segs.length === 2) {
    return finish({
      bucket: "personas",
      category: "anchor",
      persona,
      extraTags: [],
      imageRoot: "personas",
      relative,
    })
  }

  const second = segs[1]
  if (second === "training") {
    return finish({
      bucket: "personas",
      category: "lora-source",
      persona,
      extraTags: ["training"],
      imageRoot: "personas",
      relative,
    })
  }
  if (second === "images") {
    const category = PERSONA_IMAGE_BUCKETS[segs[2] ?? ""]
    if (category === undefined) return null
    return finish({
      bucket: "personas",
      category,
      persona,
      extraTags: [],
      imageRoot: "personas",
      relative,
    })
  }
  return null
}

function classifyGenerated(relative: string): CanonicalImageClass {
  const segs = relative.split("/")
  const dir = segs[0] ?? ""

  if (dir.endsWith("-explore")) {
    const persona = toPersonaSlug(dir.slice(0, -"-explore".length))
    if (segs.length >= 3) {
      const sub = segs[1] ?? ""
      if (GRADES.includes(sub)) {
        return finish({
          bucket: "explore",
          category: "explore",
          persona,
          grade: sub,
          extraTags: [],
          imageRoot: "generated",
          relative,
        })
      }
      return finish({
        bucket: "explore",
        category: "explore",
        persona,
        extraTags: [`bucket:${sub.toLowerCase()}`],
        imageRoot: "generated",
        relative,
      })
    }
    const grade = gradeFromFilename(basename(relative))
    return finish({
      bucket: "explore",
      category: "explore",
      persona,
      grade,
      extraTags: [],
      imageRoot: "generated",
      relative,
    })
  }

  if (segs.length === 1) {
    return finish({
      bucket: "generated",
      category: "generated-output",
      extraTags: [],
      imageRoot: "generated",
      relative,
    })
  }
  let stem = dir
  for (const suffix of GENERATED_DIR_SUFFIXES) {
    if (stem.endsWith(suffix)) {
      stem = stem.slice(0, -suffix.length)
      break
    }
  }
  return finish({
    bucket: "generated",
    category: "generated-output",
    persona: toPersonaSlug(stem),
    extraTags: [],
    imageRoot: "generated",
    relative,
  })
}

export function classifyCanonicalImage(
  absolutePath: string,
  roots: readonly NamedRoot[]
): CanonicalImageClass | null {
  if (!isImageName(basename(absolutePath))) return null
  const located = relativizeToNamedRoot(absolutePath, roots)
  if (located === null) return null
  if (located.tag === "personas") return classifyPersonas(located.relative)
  if (located.tag === "generated") return classifyGenerated(located.relative)
  return null
}
