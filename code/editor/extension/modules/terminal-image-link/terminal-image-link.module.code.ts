import * as fs from "node:fs"
import * as path from "node:path"
import { akashaRoot } from "akasha/code/editor/extension/modules/harness-call/harness-call.module.code.ts"
import type * as vscode from "vscode"

export type Editor = typeof import("vscode")

const ADDRESS = /\bimage\/(image-[0-9a-f]{16})\b/g

const PAGES_IN = "infrastructure/inference/generation/image/pages"

const ENDINGS = ["png", "jpg"] as const

const SITE = "https://alanwalton.com"

const OPEN = "vscode.open"

export interface ImageLink {
  readonly startIndex: number
  readonly length: number
  readonly tooltip: string
  readonly slug: string
}

export function imageLinksIn(line: string): ImageLink[] {
  const links: ImageLink[] = []
  for (const found of line.matchAll(ADDRESS)) {
    const slug = found[1]
    if (slug === undefined) continue
    links.push({ startIndex: found.index, length: found[0].length, tooltip: "Open image", slug })
  }
  return links
}

export function slugOf(link: object): string | undefined {
  return "slug" in link && typeof link.slug === "string" ? link.slug : undefined
}

export function bytesPathOf(
  root: string,
  slug: string,
  exists: (at: string) => boolean
): string | undefined {
  for (const ending of ENDINGS) {
    const at = path.join(root, PAGES_IN, `${slug}.image.bytes.uncommitted.${ending}`)
    if (exists(at)) return at
  }
  return undefined
}

export function bytesUrlOf(slug: string): string {
  return `${SITE}/api/page-file/image/${slug}/bytes`
}

export async function openImage(
  editor: Editor,
  slug: string,
  say: (text: string) => void
): Promise<undefined> {
  const at = bytesPathOf(akashaRoot(), slug, fs.existsSync)
  if (at === undefined) {
    say(`[image-link] ${slug} has no bytes here, so it opens on the site`)
    await editor.env.openExternal(editor.Uri.parse(bytesUrlOf(slug)))
    return undefined
  }
  await editor.commands.executeCommand(OPEN, editor.Uri.file(at), {
    viewColumn: editor.ViewColumn.Beside,
    preview: true,
  })
  return undefined
}

export function activate(
  editor: Editor,
  context: vscode.ExtensionContext,
  say: (text: string) => void
): undefined {
  context.subscriptions.push(
    editor.window.registerTerminalLinkProvider({
      provideTerminalLinks: (asked) => imageLinksIn(asked.line),
      handleTerminalLink: async (link) => {
        const slug = slugOf(link)
        if (slug !== undefined) await openImage(editor, slug, say)
      },
    })
  )
  return undefined
}
