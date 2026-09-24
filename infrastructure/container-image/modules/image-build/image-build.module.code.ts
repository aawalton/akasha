import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { ROOT } from "akasha/infrastructure/container-image/dockerfile/modules/services/dockerfile-services.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const RECIPE = "container-recipe"
const WRITTEN = "Containerfile"
const BUILT_IMAGE = "built-image"
const DOCKERFILE = "Dockerfile"
const REPOSITORY = "repository"
const SLUG = "slug"
const HANDED_THE_ROOT = ""

export interface ImageNamed {
  readonly slug: string
  readonly repository: string
  readonly context: string
  readonly recipe: string
}

export interface ImageBuild extends ImageNamed {
  readonly dockerfile: string
}

function recipesNamed(): readonly ImageNamed[] {
  const found: ImageNamed[] = []
  for (const one of valuesOfType(ROOT, RECIPE)) {
    const repository = textAt(one.value, REPOSITORY)
    const slug = textAt(one.value, SLUG)
    if (repository === null || slug === null) continue
    const here = dirname(one.path)
    found.push({ slug, repository, context: dirname(here), recipe: join(here, WRITTEN) })
  }
  return found
}

function imagesNamed(): readonly ImageNamed[] {
  const found: ImageNamed[] = []
  for (const one of valuesOfType(ROOT, BUILT_IMAGE)) {
    const repository = textAt(one.value, REPOSITORY)
    const slug = textAt(one.value, SLUG)
    if (repository === null || slug === null) continue
    found.push({
      slug,
      repository,
      context: HANDED_THE_ROOT,
      recipe: join(dirname(one.path), DOCKERFILE),
    })
  }
  return found
}

export function everyNamed(): readonly ImageNamed[] {
  return [...imagesNamed(), ...recipesNamed()]
}

export function namedOf(slug: string): ImageNamed {
  const found = everyNamed().find((one) => one.slug === slug)
  if (found === undefined) {
    throw new Error(`${slug} states no repository, so nothing says where to push it`)
  }
  return found
}

function dockerfileOf(named: ImageNamed, codeAt: string = ROOT): string {
  return readFileSync(join(codeAt, named.recipe), "utf8")
}

export function buildOf(slug: string, codeAt: string = ROOT): ImageBuild {
  const named = namedOf(slug)
  return { ...named, dockerfile: dockerfileOf(named, codeAt) }
}
