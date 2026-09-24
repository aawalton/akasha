import { expect, test } from "bun:test"
import {
  DocumentNonce,
  useDocumentNonce,
} from "akasha/code/router-app/modules/document-nonce/document-nonce.module.code.tsx"
import { renderToString } from "react-dom/server"

function NoncedScript() {
  return <script src="/boot.js" nonce={useDocumentNonce()} />
}

test("a tag rendered under the server entry's nonce carries that nonce", () => {
  const html = renderToString(
    <DocumentNonce nonce="nonce-under-test">
      <NoncedScript />
    </DocumentNonce>
  )

  expect(html).toContain('nonce="nonce-under-test"')
})

test("a tag rendered with no nonce handed down carries no nonce attribute", () => {
  expect(renderToString(<NoncedScript />)).not.toContain("nonce")
  expect(
    renderToString(
      <DocumentNonce nonce={undefined}>
        <NoncedScript />
      </DocumentNonce>
    )
  ).not.toContain("nonce")
})
