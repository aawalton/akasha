import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import {
  linkedOf,
  type Placing,
} from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"

const DECLARED_STYLESHEET = ".d.css.ts"

const STYLESHEET = ".css"

const DECLARATION = ".d.ts"

const PACKAGES = "node_modules"

const NO_EXPORTS = "export {}\n"

const EVERY_STYLESHEET = /^declare module ['"]\*\.css['"] \{\}\n?/gm

function stylesheetDeclared(name: string): string | null {
  if (!name.endsWith(DECLARED_STYLESHEET)) return null
  return `${name.slice(0, -DECLARED_STYLESHEET.length)}${STYLESHEET}`
}

export function declarationOver(
  root: string,
  holds: (rel: string) => boolean,
  placed: Placing
): (name: string) => string | null | undefined {
  return (name) => {
    const sheet = stylesheetDeclared(name)
    if (sheet === null) return undefined
    const real = linkedOf(root, resolve(sheet), placed)
    const inside = real.startsWith(`${root}/`) && !real.includes(`/${PACKAGES}/`)
    const there = inside ? holds(real.slice(root.length + 1)) : existsSync(real)
    return there ? NO_EXPORTS : null
  }
}

export function everyStylesheetOut(full: string): string | undefined {
  if (!full.endsWith(DECLARATION) || !existsSync(full)) return undefined
  const text = readFileSync(full, "utf8")
  const kept = text.replace(EVERY_STYLESHEET, "")
  return kept === text ? undefined : kept
}
