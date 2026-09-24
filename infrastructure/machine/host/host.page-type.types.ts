import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { HostAddress } from "akasha/infrastructure/machine/host/properties/host-address.text-property.types.ts"
import type { KeyPath } from "akasha/infrastructure/machine/host/properties/key-path.text-property.types.ts"
import type { LoginUser } from "akasha/infrastructure/machine/host/properties/login-user.text-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type Host = Domain & {
  title: Title
  address?: HostAddress
  loginUser?: LoginUser
  keyPath?: KeyPath
}
