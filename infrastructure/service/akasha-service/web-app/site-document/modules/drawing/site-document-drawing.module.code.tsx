import { PageTitle } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { Heading } from "akasha/design/interface/primitive/modules/heading/heading.module.code.tsx"
import type { DrawnDocument } from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { MarkdownRenderer } from "akasha/page/ui/markdown/modules/markdown-renderer/markdown-renderer.module.code.tsx"
import type { ReactNode } from "react"
import type { Components } from "react-markdown"

const LEAVING = /^[a-z][a-z0-9+.-]*:\/\//i

const MAILTO = "mailto:"

const LINKED = "text-accent underline"

function textOf(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children)
  if (Array.isArray(children)) return children.map(textOf).join("")
  return ""
}

function escaped(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function Mailed({ href, children }: { href: string; children?: ReactNode }) {
  const link = `<a class="${LINKED}" href="${escaped(href)}">${escaped(textOf(children))}</a>`
  return <span dangerouslySetInnerHTML={{ __html: `<!--email_off-->${link}<!--/email_off-->` }} />
}

function Linked({ href, children }: { href?: string; children?: ReactNode }) {
  if (href?.startsWith(MAILTO)) return <Mailed href={href}>{children}</Mailed>
  if (href !== undefined && LEAVING.test(href)) {
    return (
      <a href={href} className={LINKED} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return (
    <a href={href} className={LINKED}>
      {children}
    </a>
  )
}

const DRAWN: Components = {
  a: Linked,
  h3: ({ children }) => <Heading variant="subsection-accent">{children}</Heading>,
  p: ({ children }) => <p className="text-secondary text-sm">{children}</p>,
  ul: ({ children }) => (
    <ul className="list-disc space-y-1 pl-5 text-secondary text-sm">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal space-y-1 pl-5 text-secondary text-sm">{children}</ol>
  ),
  li: ({ children }) => <li>{children}</li>,
}

type Beneath = Readonly<Record<string, ReactNode>>

export function SiteDocumentDrawing({
  document,
  beneath = {},
}: {
  document: DrawnDocument
  beneath?: Beneath
}) {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="space-y-6">
        <header className="space-y-2">
          <PageTitle>{document.title}</PageTitle>
          {document.lead === null ? null : (
            <MarkdownRenderer content={document.lead} components={DRAWN} className="space-y-2" />
          )}
        </header>
        {document.sections.map((section) => (
          <PanelCard key={section.anchor} id={section.anchor} title={section.title}>
            <div className="space-y-3">
              {section.lead === null ? null : (
                <Heading variant="subsection-accent">{section.lead}</Heading>
              )}
              {section.text === null ? null : (
                <MarkdownRenderer content={section.text} components={DRAWN} className="space-y-3" />
              )}
              {beneath[section.anchor] ?? null}
            </div>
          </PanelCard>
        ))}
      </div>
    </main>
  )
}
