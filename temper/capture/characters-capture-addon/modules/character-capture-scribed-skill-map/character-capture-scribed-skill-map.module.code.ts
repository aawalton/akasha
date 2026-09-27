import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { temperFocusScript } from "akasha/temper/catalog/skill/temper-focus-script/temper-focus-script.page-type.ts"
import type { TemperFocusScript } from "akasha/temper/catalog/skill/temper-focus-script/temper-focus-script.page-type.types.ts"
import { temperGrimoire } from "akasha/temper/catalog/skill/temper-grimoire/temper-grimoire.page-type.ts"
import type { TemperGrimoire } from "akasha/temper/catalog/skill/temper-grimoire/temper-grimoire.page-type.types.ts"
import { temperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.ts"
import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

type Named = { [address: string]: string | undefined }

type Places = { [names: string]: number | undefined }

type ScribedSkillPage = Pick<
  TemperScribedSkill,
  "esoSkillId" | "grimoireId" | "focusScriptId" | "hashPlace"
>

let held: Places | undefined

let scribed: readonly ScribedSkillPage[] | undefined

export function scribedSkillPages(): readonly ScribedSkillPage[] {
  if (scribed === undefined) scribed = $pagesOfType<ScribedSkillPage>(temperScribedSkill)
  return scribed
}

function titlesOf(
  this: void,
  pageTypeSlug: string,
  pages: readonly { readonly slug: string; readonly title?: string }[]
): Named {
  const found: Named = {}
  for (const one of pages) found[`${pageTypeSlug}/${one.slug}`] = one.title
  return found
}

function placesOf(this: void): Places {
  const grimoires = titlesOf(
    temperGrimoire.slug,
    $pagesOfType<Pick<TemperGrimoire, "slug" | "title">>(temperGrimoire)
  )
  const focuses = titlesOf(
    temperFocusScript.slug,
    $pagesOfType<Pick<TemperFocusScript, "slug" | "title">>(temperFocusScript)
  )
  const scribed = scribedSkillPages()
  let first: number | undefined
  for (const one of scribed) {
    if (first === undefined || one.hashPlace < first) first = one.hashPlace
  }
  const found: Places = {}
  for (const one of scribed) {
    const grimoire = grimoires[one.grimoireId]
    const focus = focuses[one.focusScriptId]
    if (grimoire === undefined || focus === undefined) continue
    found[`${grimoire}|${focus}`] = one.hashPlace - (first ?? 0)
  }
  return found
}

export function getScribedSkillIndex(grimoireName: string, focusScriptName: string): number {
  if (held === undefined) held = placesOf()
  return held[`${grimoireName}|${focusScriptName}`] ?? 0
}
