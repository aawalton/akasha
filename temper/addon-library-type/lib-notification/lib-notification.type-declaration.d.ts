interface LibNotificationProvider {
  notifications: unknown[]
  UpdateNotifications: () => void
}

interface LibNotifications {
  CreateProvider: () => LibNotificationProvider
}

declare const LibNotifications: LibNotifications

declare const NOTIFICATIONS_REQUEST_DATA: number
