"use client"

import { PageDetailContent } from "@akasha/pages-ui-components/page-detail-content"
import type { ComponentProps } from "react"
import { useMarkNotificationReadOnView } from "../use-mark-notification-read/use-mark-notification-read.module.code.ts"
import { useMarkReadOnEnd } from "../use-mark-read-on-end/use-mark-read-on-end.module.code.ts"

type Props = Omit<ComponentProps<typeof PageDetailContent>, "onReadToEnd">

export function PageDetailWithReadMark(props: Props) {
  const onReadToEnd = useMarkReadOnEnd({ pageTypeSlug: props.pageTypeSlug, id: props.id })
  useMarkNotificationReadOnView({ pageTypeSlug: props.pageTypeSlug, id: props.id })
  return <PageDetailContent {...props} onReadToEnd={onReadToEnd} />
}
