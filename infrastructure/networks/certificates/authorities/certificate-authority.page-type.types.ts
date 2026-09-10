import type { Domain } from "../../../../domains/domain.page-type.types.ts"
import type { AuthorityCertificate } from "./properties/authority-certificate.file-property.ts"

export type CertificateAuthority = Domain & {
  authorityCertificate: AuthorityCertificate
}
