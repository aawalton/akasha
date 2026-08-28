"use client"

import { PageDetailContent } from "@shared/pages-ui/components/page-detail-content"
import type { ComponentProps } from "react"
import { useMarkNotificationReadOnView } from "~/hooks/use-mark-notification-read"
import { useMarkReadOnEnd } from "~/hooks/use-mark-read-on-end"

type Props = Omit<ComponentProps<typeof PageDetailContent>, "onReadToEnd">

export function PageDetailWithReadMark(props: Props) {
  const onReadToEnd = useMarkReadOnEnd({ pageTypeSlug: props.pageTypeSlug, id: props.id })
  useMarkNotificationReadOnView({ pageTypeSlug: props.pageTypeSlug, id: props.id })
  return <PageDetailContent {...props} onReadToEnd={onReadToEnd} />
}
