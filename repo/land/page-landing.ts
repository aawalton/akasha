import { type Answer, type Asked, useLanding } from "../../pages-system/write/landing.ts"
import { GATED, refusalsOver } from "../../patches/patch.ts"
import { AKASHA } from "../roots/roots.ts"
import { patchAside } from "./body-aside.ts"
import { LandingRefused, landFiles } from "./land.ts"

const NOWHERE: ReadonlyMap<string, string> = new Map()

const judged = (asked: Asked): string | null => {
  if (asked.repo !== AKASHA) return null
  if (process.env[GATED] === "1") return null
  const patch = patchAside(asked.entries, [], asked.removing, asked.root)
  if (patch.trim() === "") return null
  const said = refusalsOver(patch, asked.root, [], NOWHERE)
  return said.length === 0 ? null : said.join("\n")
}

export const landsInAkasha = (asked: Asked): Answer => {
  const why = judged(asked)
  if (why !== null) return { refused: why }
  try {
    const landed = landFiles({
      repo: asked.repo,
      root: asked.root,
      message: asked.message,
      entries: asked.entries,
      removing: asked.removing,
      mechanical: true,
    })
    return { wrote: landed.wrote, gone: landed.gone, sha: landed.sha }
  } catch (thrown) {
    if (thrown instanceof LandingRefused) return { refused: thrown.message }
    throw thrown
  }
}

export const useAkashaLanding = (): void => {
  useLanding(landsInAkasha)
}
