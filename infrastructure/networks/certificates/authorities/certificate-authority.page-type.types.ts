import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { AuthorityCertificate } from "akasha/infrastructure/networks/certificates/authorities/properties/authority-certificate.file-property.ts"

export type CertificateAuthority = Domain & {
  authorityCertificate: AuthorityCertificate
}
