"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { formatSmartDate } from "@shared/pages-core/view/format-smart-date"

import type { MentionResolver, MentionType } from "./remark-mentions"
import { isMentionType } from "./remark-mentions"

const variantMap: Record<MentionType, "accent" | "green" | "blue"> = {
  page: "accent",
  user: "green",
  date: "blue",
}

const FALLBACK_MENTION_TYPE: MentionType = "page"

export function MentionChip({
  mentionType,
  mentionId,
  mentionAnchor,
  resolver,
}: {
  mentionType: string
  mentionId: string
  mentionAnchor?: string
  resolver?: MentionResolver
}) {
  const type: MentionType = isMentionType(mentionType) ? mentionType : FALLBACK_MENTION_TYPE
  const variant = variantMap[type] ?? "accent"
  const fallback =
    mentionAnchor != null
      ? `@${mentionType}:${mentionId}#${mentionAnchor}`
      : `@${mentionType}:${mentionId}`

  if (type === "date") {
    return <Badge variant="blue">{formatSmartDate(mentionId)}</Badge>
  }

  if (!resolver) {
    return <Badge variant={variant}>{fallback}</Badge>
  }

  const resolved = resolver(type, mentionId)

  if (resolved.href != null) {
    const href = mentionAnchor != null ? `${resolved.href}#${mentionAnchor}` : resolved.href
    return (
      <Badge variant={variant} asChild>
        <a href={href}>{resolved.label}</a>
      </Badge>
    )
  }

  return <Badge variant={variant}>{resolved.label}</Badge>
}
