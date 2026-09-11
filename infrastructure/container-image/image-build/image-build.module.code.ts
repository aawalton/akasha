import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  IMAGES,
  ROOT,
} from "akasha/infrastructure/container-image/dockerfiles/dockerfile-services/dockerfile-services.module.code.ts"
import { dockerfileFor } from "akasha/infrastructure/container-image/dockerfiles/dockerfile-writing/dockerfile-writing.module.code.ts"
import { valuesOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { textAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const RECIPE = "container-recipe"
const WRITTEN = "Containerfile"
const REPOSITORY = "repository"
const SLUG = "slug"
const HANDED_THE_ROOT = ""

export interface ImageNamed {
  readonly slug: string
  readonly repository: string
  readonly context: string
  readonly recipe: string | null
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
  for (const one of IMAGES) {
    if (one.repository === undefined) continue
    found.push({
      slug: one.slug,
      repository: one.repository,
      context: HANDED_THE_ROOT,
      recipe: null,
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

export function dockerfileOf(named: ImageNamed): string {
  if (named.recipe === null) return dockerfileFor(named.slug)
  return readFileSync(join(ROOT, named.recipe), "utf8")
}

export function buildOf(slug: string): ImageBuild {
  const named = namedOf(slug)
  return { ...named, dockerfile: dockerfileOf(named) }
}
