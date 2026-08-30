import { type Answer, type Asked, useLanding } from "../../pages-system/write/landing.ts"
import { patchAside } from "./body-aside.ts"
import { LandingRefused, landFiles } from "./land.ts"

export const landsInAkasha = (asked: Asked): Answer => {
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
