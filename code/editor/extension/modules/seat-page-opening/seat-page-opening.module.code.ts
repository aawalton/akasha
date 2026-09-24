import { seat as seatPageType } from "akasha/agent/seat/seat.page-type.ts"
import type { SeatClick } from "akasha/code/editor/extension/modules/agent-row/agent-row.module.code.ts"
import { parseSeatClick } from "akasha/code/editor/extension/modules/invoked-seat/invoked-seat.module.code.ts"
import { buildPageHref } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import * as vscode from "vscode"
import "akasha/code/editor/extension/vscode-api/vscode-api.type-declaration.d.ts"

const SITE = "https://alanwalton.com"

export function seatPageUrl(seat: SeatClick): string {
  const href = buildPageHref({
    pageTypeSlug: toPageTypeSlug(seatPageType.slug),
    slug: seat.name,
    fallbackSlugSource: null,
    id: seat.id,
  })
  return `${SITE}${href}`
}

export async function openSeatPage(clicked: unknown): Promise<undefined> {
  const seat = parseSeatClick(clicked)
  if (seat === undefined) {
    return undefined
  }
  await vscode.env.openExternal(vscode.Uri.parse(seatPageUrl(seat)))
  return undefined
}
