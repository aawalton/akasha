export const DEVICE_SECRET_PREFIX = "dvs_v1_"

export const DEVICE_SECRET_BODY_LENGTH = 43

const SHAPE = new RegExp(`^${DEVICE_SECRET_PREFIX}[A-Za-z0-9_-]{${DEVICE_SECRET_BODY_LENGTH}}$`)

export function hasDeviceSecretShape(value: string): boolean {
  return SHAPE.test(value)
}
