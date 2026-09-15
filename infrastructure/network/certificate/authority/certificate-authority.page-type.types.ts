import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { AuthorityCertificate } from "akasha/infrastructure/network/certificate/authority/properties/authority-certificate.file-property.types.ts"

export type CertificateAuthority = Domain & {
  authorityCertificate: AuthorityCertificate
}
