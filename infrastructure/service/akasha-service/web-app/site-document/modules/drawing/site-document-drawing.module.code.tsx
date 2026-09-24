import { PageTitle } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { Heading } from "akasha/design/interface/primitive/modules/heading/heading.module.code.tsx"
import type { DrawnDocument } from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { MarkdownRenderer } from "akasha/page/ui/markdown/modules/markdown-renderer/markdown-renderer.module.code.tsx"
import type { ReactNode } from "react"
import type { Components } from "react-markdown"

const LEAVING = /^[a-z][a-z0-9+.-]*:\/\//i

function Linked({ href, children }: { href?: string; children?: ReactNode }) {
  if (href !== undefined && LEAVING.test(href)) {
    return (
      <a href={href} className="text-accent underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return (
    <a href={href} className="text-accent underline">
      {children}
    </a>
  )
}

const DRAWN: Components = {
  a: Linked,
  p: ({ children }) => <p className="text-secondary text-sm">{children}</p>,
  li: ({ children }) => <li className="text-secondary">{children}</li>,
}

export function SiteDocumentDrawing({ document }: { document: DrawnDocument }) {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="space-y-6">
        <header className="space-y-2">
          <PageTitle>{document.title}</PageTitle>
          {document.lead === null ? null : (
            <p className="text-secondary text-sm">{document.lead}</p>
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
            </div>
          </PanelCard>
        ))}
      </div>
    </main>
  )
}
