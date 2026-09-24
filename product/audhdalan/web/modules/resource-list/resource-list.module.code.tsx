import { Heading } from "akasha/design/interface/primitive/modules/heading/heading.module.code.tsx"
import { MarkdownRenderer } from "akasha/page/ui/markdown/modules/markdown-renderer/markdown-renderer.module.code.tsx"
import {
  ExternalLink,
  FileSpreadsheet,
  Gauge,
  Link2,
  NotebookPen,
  Presentation,
} from "lucide-react"
import type { ReactNode } from "react"
import type { Components } from "react-markdown"
import { Link } from "react-router"

const LEAVING = /^[a-z][a-z0-9+.-]*:\/\//i

const ICONS: readonly (readonly [RegExp, typeof Presentation])[] = [
  [/^\/autcon-/, Presentation],
  [/^\/safety-levels/, Gauge],
  [/docs\.google\.com\/spreadsheets/, FileSpreadsheet],
  [/notion\.site/, NotebookPen],
]

function iconFor(href: string): typeof Presentation {
  return ICONS.find(([pattern]) => pattern.test(href))?.[1] ?? Link2
}

function Resource({ href = "", children }: { href?: string; children?: ReactNode }) {
  const Icon = iconFor(href)
  const leaving = LEAVING.test(href)
  const linkProps = leaving
    ? { to: href, target: "_blank", rel: "noopener noreferrer", reloadDocument: true }
    : { to: href }
  return (
    <Link
      {...linkProps}
      className="-ml-10 flex cursor-pointer items-center gap-4 [&_h3]:cursor-pointer"
    >
      <Icon className="size-6 shrink-0 text-accent" aria-hidden />
      <Heading variant="subsection-accent" as="h3" className="flex items-center gap-2 text-xl">
        {children}
        {leaving ? <ExternalLink className="size-4 text-accent" aria-hidden /> : null}
      </Heading>
    </Link>
  )
}

const LISTED: Components = {
  ul: ({ children }) => <ul className="space-y-6">{children}</ul>,
  li: ({ children }) => (
    <li className="flex flex-col gap-1 pl-10 text-base text-secondary leading-relaxed [&>br]:hidden">
      {children}
    </li>
  ),
  a: Resource,
}

export function ResourceList({ text }: { text: string }): React.JSX.Element {
  return <MarkdownRenderer content={text} components={LISTED} />
}
