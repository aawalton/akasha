import { InputError } from "@akasha/errors-core/exit-code"
import {
  type AutomationSettings,
  type CharacterAutomationToggles,
  type CharacterToggleName,
  type CompanionAutomationToggles,
  type CompanionToggleName,
  characterToggleNamesSaid,
  companionToggleNamesSaid,
  isCharacterToggleName,
  isCompanionToggleName,
} from "../automation-toggles/automation-toggles.module.code.ts"

export type AutomationScope =
  | { readonly kind: "global"; readonly target: "characters" | "companions" }
  | { readonly kind: "character"; readonly esoCharId: string }
  | { readonly kind: "companion"; readonly companionId: string }

export type ToggleValue = boolean | null

const CHARACTER_PREFIX = "character:"

const COMPANION_PREFIX = "companion:"

function narrowCharacterToggle(toggle: string): CharacterToggleName {
  if (!isCharacterToggleName(toggle))
    throw new InputError(
      `toggle '${toggle}' is not a character toggle (character toggles: ${characterToggleNamesSaid()})`
    )
  return toggle
}

function narrowCompanionToggle(toggle: string): CompanionToggleName {
  if (!isCompanionToggleName(toggle))
    throw new InputError(
      `toggle '${toggle}' is not a companion toggle (companion toggles: ${companionToggleNamesSaid()})`
    )
  return toggle
}

function globalScopeFrom(toggle: string, target: string | undefined): AutomationScope {
  const forCharacters = isCharacterToggleName(toggle)
  const forCompanions = isCompanionToggleName(toggle)
  if (forCharacters && forCompanions) {
    if (target === undefined)
      throw new InputError(
        `--scope global with toggle '${toggle}' is ambiguous (matches both characters and companions); pass --target characters|companions to disambiguate`
      )
    return { kind: "global", target: target === "characters" ? "characters" : "companions" }
  }
  if (forCharacters) {
    if (target !== undefined && target !== "characters")
      throw new InputError(
        `--target ${target} contradicts toggle '${toggle}' which only applies to characters`
      )
    return { kind: "global", target: "characters" }
  }
  if (forCompanions) {
    if (target !== undefined && target !== "companions")
      throw new InputError(
        `--target ${target} contradicts toggle '${toggle}' which only applies to companions`
      )
    return { kind: "global", target: "companions" }
  }
  throw new InputError(`unknown toggle: '${toggle}'`)
}

export function parseScope(
  said: string,
  toggle: string,
  target: string | undefined
): AutomationScope {
  if (said === "global") return globalScopeFrom(toggle, target)
  if (said.startsWith(CHARACTER_PREFIX)) {
    const esoCharId = said.slice(CHARACTER_PREFIX.length)
    if (esoCharId === "")
      throw new InputError("--scope character: requires an esoCharId (e.g. character:@user__name)")
    narrowCharacterToggle(toggle)
    if (target !== undefined)
      throw new InputError("--target is only meaningful with --scope=global")
    return { kind: "character", esoCharId }
  }
  if (said.startsWith(COMPANION_PREFIX)) {
    const companionId = said.slice(COMPANION_PREFIX.length)
    if (companionId === "")
      throw new InputError("--scope companion: requires a companionId (e.g. companion:bastian)")
    narrowCompanionToggle(toggle)
    if (target !== undefined)
      throw new InputError("--target is only meaningful with --scope=global")
    return { kind: "companion", companionId }
  }
  throw new InputError(
    `--scope must be 'global', 'character:<esoCharId>', or 'companion:<companionId>'; got: '${said}'`
  )
}

export function parseValue(said: string): ToggleValue {
  if (said === "true") return true
  if (said === "false") return false
  if (said === "null") return null
  throw new InputError(`--value must be 'true', 'false', or 'null'; got: '${said}'`)
}

function characterTogglesWith(
  toggles: CharacterAutomationToggles,
  toggle: CharacterToggleName,
  value: ToggleValue
): CharacterAutomationToggles {
  const next: CharacterAutomationToggles = { ...toggles }
  if (value === null) {
    delete next[toggle]
    return next
  }
  next[toggle] = value
  return next
}

function companionTogglesWith(
  toggles: CompanionAutomationToggles,
  toggle: CompanionToggleName,
  value: ToggleValue
): CompanionAutomationToggles {
  const next: CompanionAutomationToggles = { ...toggles }
  if (value === null) {
    delete next[toggle]
    return next
  }
  next[toggle] = value
  return next
}

export function applyToggle(
  settings: AutomationSettings,
  scope: AutomationScope,
  toggle: string,
  value: ToggleValue
): AutomationSettings {
  if (scope.kind === "global") {
    const globalNext = { ...(settings.global ?? {}) }
    if (scope.target === "characters")
      globalNext.characters = characterTogglesWith(
        globalNext.characters ?? {},
        narrowCharacterToggle(toggle),
        value
      )
    else
      globalNext.companions = companionTogglesWith(
        globalNext.companions ?? {},
        narrowCompanionToggle(toggle),
        value
      )
    return { ...settings, global: globalNext }
  }
  if (scope.kind === "character") {
    const characters = { ...settings.characters }
    characters[scope.esoCharId] = characterTogglesWith(
      characters[scope.esoCharId] ?? {},
      narrowCharacterToggle(toggle),
      value
    )
    return { ...settings, characters }
  }
  const companions = { ...settings.companions }
  companions[scope.companionId] = companionTogglesWith(
    companions[scope.companionId] ?? {},
    narrowCompanionToggle(toggle),
    value
  )
  return { ...settings, companions }
}
