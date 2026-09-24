import { createContext, type ReactNode, useContext } from "react"

const DocumentNonceContext = createContext<string | undefined>(undefined)

export function DocumentNonce({
  nonce,
  children,
}: {
  nonce: string | undefined
  children: ReactNode
}) {
  return <DocumentNonceContext value={nonce}>{children}</DocumentNonceContext>
}

export function useDocumentNonce(): string | undefined {
  return useContext(DocumentNonceContext)
}
